import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from 'sonner';
import DialogCustom from "~/components/customs/dialog-custom";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TRANSLATE_KEYS } from "~/constants";
import type { HRSettingSchema } from "~/helpers";
import useAppTranslations from "~/hooks/use-app-translations";
import { eHRInfoSettingCodeFormKey } from "~/types/enums/form.enum";
import fetchClient from '~/configs/fetch.config';
import { HRInformationService, type IHRInformationResponse } from '~/services/api';
import cookieHelper from '~/helpers/cookie.helper';

// HR Type API response interface
interface IHRType {
  id: string;
  createddate: string;
  updateddate: string;
  recordstatus: number;
  user_id: string;
  name: string;
}

interface IHRTypeResponse {
  status: boolean;
  message: string;
  status_code: number;
  data: IHRType[];
}

interface StaffCodeHRInfoSettingProps {
  form: UseFormReturn<HRSettingSchema>;
  hrTypes?: IHRType[];
  departmentData?: IHRInformationResponse[];
  contractTypesData?: IHRInformationResponse[];
  jobTitleData?: IHRInformationResponse[];
  employmentStatusData?: IHRInformationResponse[];
  bankInfoData?: IHRInformationResponse[];
  onDataChange?: () => void;
}



const StaffCodeHRInfoSetting = ({
  form,
  hrTypes = [],
  departmentData = [],
  contractTypesData = [],
  jobTitleData = [],
  employmentStatusData = [],
  bankInfoData = [],
  onDataChange,
}: StaffCodeHRInfoSettingProps) => {
  const { t } = useAppTranslations();


  // State management
  const [hrSettingTypes, setHrSettingTypes] = useState<IHRType[]>([]);
  const [selectedHRSettingType, setSelectedHRSettingType] = useState<IHRType | null>(null);
  const [teamName, setTeamName] = useState<string>('');
  const [addNewTeam, setAddNewTeam] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hrInformationData, setHrInformationData] = useState<IHRInformationResponse[]>([]);
  const [isLoadingHRInfo, setIsLoadingHRInfo] = useState<boolean>(false);
  const [selectedHRInfo, setSelectedHRInfo] = useState<IHRInformationResponse | null>(null);
  const [deleteHRDialog, setDeleteHRDialog] = useState<boolean>(false);
  const [hrInfoToDelete, setHrInfoToDelete] = useState<IHRInformationResponse | null>(null);

  // Use provided HR types data
  const initializeHRData = () => {
    if (hrTypes.length > 0) {
      setHrSettingTypes(hrTypes);
      setSelectedHRSettingType(hrTypes[0]);
      updateHRInformationDataByType(hrTypes[0]);
    }
  };

  // Use provided HR data instead of loading from API
  const updateHRInformationDataByType = (hrType: IHRType) => {
    let dataToShow: IHRInformationResponse[] = [];

    // Map HR type names to the corresponding data arrays
    switch (hrType.name) {
      case 'Department':
        dataToShow = departmentData;
        break;
      case 'Contract Type':
        dataToShow = contractTypesData;
        break;
      case 'Job Title':
        dataToShow = jobTitleData;
        break;
      case 'Employment Status':
        dataToShow = employmentStatusData;
        break;
      case 'Bank Name':
        dataToShow = bankInfoData;
        break;
      default:
        dataToShow = [];
    }

    setHrInformationData(dataToShow);
  };

  // Handle HR setting type selection
  const handleHRSettingTypeSelect = (setting: IHRType) => {
    setSelectedHRSettingType(setting);
    setSelectedHRInfo(null);
    setTeamName('');
    // Update HR information data when a type is selected
    updateHRInformationDataByType(setting);
  };

  // Create new HR information
  const createNewHRInformation = async (name: string, hrType: IHRType) => {
    try {
      setIsLoadingHRInfo(true);
      const currentDate = new Date().toISOString();
      const userId = cookieHelper.getUserId();

      const payload = {
        name: name,
        type: {
          id: hrType.id,
          createddate: hrType.createddate || currentDate,
          updateddate: hrType.updateddate || currentDate,
          recordstatus: hrType.recordstatus,
          user_id: userId || crypto.randomUUID(), // Use stored user_id or generate new one
          name: hrType.name
        }
      };
      const response = await HRInformationService.create(payload);
      if (response) {
        toast.success('HR information created successfully');
        // Trigger parent component to reload all HR data
        if (onDataChange) {
          onDataChange();
        } else {
          // Fallback: update local state with current data
          updateHRInformationDataByType(hrType);
        }
        setAddNewTeam(false);
      } else {
        toast.error('Failed to create HR information');
      }
    } catch (error: any) {
      console.error('Error creating HR information:', error);
      toast.error(`Failed to create HR information: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoadingHRInfo(false);
    }
  };

  // Handle delete HR information click
  const handleDeleteHRInformation = (hrInfo: IHRInformationResponse, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent onClick
    setHrInfoToDelete(hrInfo);
    setDeleteHRDialog(true);
  };

  // Confirm delete HR information
  const confirmDeleteHRInformation = async () => {
    if (!hrInfoToDelete) return;

    try {
      setIsLoadingHRInfo(true);
      const response = await HRInformationService.delete(hrInfoToDelete.id);
      if (response) {
        toast.success('HR information deleted successfully');
        // Trigger parent component to reload all HR data
        if (onDataChange) {
          onDataChange();
        } else if (selectedHRSettingType) {
          // Fallback: update local state with current data
          updateHRInformationDataByType(selectedHRSettingType);
        }
        // Clear selection if the deleted item was selected
        if (selectedHRInfo?.id === hrInfoToDelete.id) {
          setSelectedHRInfo(null);
          setTeamName('');
        }
      } else {
        toast.error('Failed to delete HR information');
      }
    } catch (error: any) {
      console.error('Error deleting HR information:', error);
      toast.error(`Failed to delete HR information: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoadingHRInfo(false);
      setDeleteHRDialog(false);
      setHrInfoToDelete(null);
    }
  };

  // Update existing HR information
  const updateHRInformation = async (name: string, hrInfo: IHRInformationResponse) => {
    try {
      setIsLoadingHRInfo(true);
      const currentDate = new Date().toISOString();

      const payload = {
        id: hrInfo.id,
        createddate: hrInfo.createddate,
        updateddate: currentDate,
        recordstatus: hrInfo.recordstatus,
        user_id: hrInfo.user_id,
        name: name,
        type: {
          id: hrInfo.type.id,
          createddate: hrInfo.type.createddate,
          updateddate: hrInfo.type.updateddate,
          recordstatus: hrInfo.type.recordstatus,
          user_id: hrInfo.type.user_id,
          name: hrInfo.type.name
        }
      };
      const response = await HRInformationService.update(payload);

      if (response) {
        toast.success('HR information updated successfully');
        // Trigger parent component to reload all HR data
        if (onDataChange) {
          onDataChange();
        } else if (selectedHRSettingType) {
          // Fallback: update local state with current data
          updateHRInformationDataByType(selectedHRSettingType);
        }
      } else {
        toast.error('Failed to update HR information');
      }
    } catch (error: any) {
      console.error('Error updating HR information:', error);
      toast.error(`Failed to update HR information: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoadingHRInfo(false);
    }
  };

  // Handle save operation
  const handleSave = async () => {
    if (!selectedHRSettingType) {
      toast.error('Please select an HR setting type first');
      return;
    }

    if (!teamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }

    if (selectedHRInfo) {
      // Update existing HR information
      await updateHRInformation(teamName.trim(), selectedHRInfo);
    } else {
      // Create new HR information (either direct create or via Add New button)
      await createNewHRInformation(teamName.trim(), selectedHRSettingType);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).handleSaveHRInfoSetting = handleSave;
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).handleSaveHRInfoSetting;
      }
    };
  }, [selectedHRSettingType, teamName, addNewTeam, selectedHRInfo]);

  // Initialize data when props change
  useEffect(() => {
    initializeHRData();
  }, [hrTypes, departmentData, contractTypesData, jobTitleData, employmentStatusData, bankInfoData]);



  return (
    <>
    <div className="grid grid-cols-12 gap-0 overflow-hidden m-[-15px]">
      {/* First part: 8 columns with 2 sub-columns */}
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <p className="text-[12px] font-[600] my-4 mx-4">{t(TRANSLATE_KEYS.TITLE,'selectHRType')}</p>
          <div className="h-[260px] overflow-y-scroll">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-[12px] font-[400] text-gray-500">Loading...</p>
              </div>
            ) : (
              hrSettingTypes?.map((setting: IHRType, index: number) => (
                <div
                  className={`${selectedHRSettingType?.id === setting.id ? 'bg-[#0E35FF0D]' : 'bg-none'} cursor-pointer border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7]`}
                  key={index}
                  onClick={() => handleHRSettingTypeSelect(setting)}
                >
                  <p className="text-[12px] font-[400] py-3 mx-4">
                    {setting.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <div className=" flex flex-row items-center cursor-pointer" onClick={()=>{setAddNewTeam(true); setTeamName(''); setSelectedHRInfo(null)}}>
            <PlusCircleIcon className='w-[22px] h-[22px] ml-4' />
            <p className="text-[12px] font-[400] my-4 mx-1">
              {t(TRANSLATE_KEYS.ACTION,'addNewHRType')}
            </p>
          </div>
          <div className="h-[260px] overflow-y-scroll">
            {isLoadingHRInfo ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-[12px] font-[400] text-gray-500">Loading HR Information...</p>
              </div>
            ) : hrInformationData.length > 0 ? (
              hrInformationData.map((hrInfo: IHRInformationResponse, index: number) => (
                <div
                  className={`${selectedHRInfo?.id === hrInfo.id ? 'bg-[#0E35FF0D]' : 'bg-none'} cursor-pointer border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7] group flex items-center justify-between py-3 px-4 hover:bg-primary-main/5`}
                  key={index}
                  onClick={() => {setSelectedHRInfo(hrInfo); setTeamName(hrInfo.name); setAddNewTeam(false)}}
                >
                  <p className="text-[12px] font-[400]">
                    {hrInfo.name}
                  </p>
                  <Trash2Icon
                    className='w-4 h-4 text-gray-main opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-500 cursor-pointer'
                    onClick={(e) => handleDeleteHRInformation(hrInfo, e)}
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center py-8">
                <p className="text-[12px] font-[400] text-gray-500">
                  {selectedHRSettingType ? 'No HR information found' : 'Select an HR setting type to view data'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="col-span-4 gap-5">
        <div className="m-4 cursor-pointer">
          <Form {...form}>
            <FormField
              control={form.control}
              name={eHRInfoSettingCodeFormKey.TeamName}
              render={({}) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.LABEL, "teamName")}
                  </FormLabel>
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      value={teamName}
                      onChange={(e)=>setTeamName(e.target.value)}
                      placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                      className="border-none"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </div>
      </section>
    </div>

    {/* Delete HR Information Confirmation Dialog */}
    <DialogCustom
      open={deleteHRDialog}
      onOpenChange={setDeleteHRDialog}
      hiddenHeader
      cancelText={t(TRANSLATE_KEYS.ACTION, 'cancel')}
      okText={t(TRANSLATE_KEYS.ACTION, 'check')}
      onOkAction={confirmDeleteHRInformation}
    >
      <p className='text-center py-[29px] text-black-main leading-[30px] tracking-[-0.5%] font-bold text-[22px]'>
        {t(TRANSLATE_KEYS.CONFIRM, 'areYouSureYouWantToDeleteIt')}
      </p>
    </DialogCustom>
    </>
  );
};

export default StaffCodeHRInfoSetting;
