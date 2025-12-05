import { PlusCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from 'sonner';
import { CategoryIcon, EditIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TRANSLATE_KEYS } from "~/constants";
import type { Permissionschema } from "~/helpers";
import useAppTranslations from "~/hooks/use-app-translations";
import {
  ePermissionCodeFormKey,
} from "~/types/enums/form.enum";
import { HRInformationService, type IPermission } from "~/services/api";

interface StaffCodePermissionProps {
  form: UseFormReturn<Permissionschema>;
  onSelectPermission?: (permission: IPermission) => void;
  onNewPermission?: () => void;
}

const StaffCodePermission = ({ form, onSelectPermission, onNewPermission }: StaffCodePermissionProps) => {
  const { t } = useAppTranslations();
  const [selectedPermissionType, setSelectedPermissionType] = useState({
    id: 0,
    name: "",
  });
  const [permissionName, setPermissionName] = useState<string>("");
  const [addNewPermission, setAddNewPermission] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permissionStates, setPermissionStates] = useState<{[key: string]: {readable: boolean, editable: boolean}}>({});

  const PermissionType = [
    { id: 1, name: t(TRANSLATE_KEYS.REGISTER, "superAdmin") },
    { id: 2, name: t(TRANSLATE_KEYS.REGISTER, "systemAdmin") },
    { id: 3, name: t(TRANSLATE_KEYS.REGISTER, "staff") },
  ];

  // Load permissions from API
  const loadPermissions = async () => {
    try {
      setIsLoading(true);
      const response = await HRInformationService.getPermissions();

      if (response.status && response.data) {
        setPermissions(response.data);
        // Initialize permission states
        const initialStates: {[key: string]: {readable: boolean, editable: boolean}} = {};
        response.data.forEach(permission => {
          initialStates[permission.id] = {
            readable: permission.readable,
            editable: permission.editable
          };
        });
        setPermissionStates(initialStates);

        // Set default selection to first item (index 0)
        // if (response.data.length > 0) {
        //   setSelectedPermissionType({id: 1, name: response.data[0].name});
        //   setPermissionName(response.data[0].name);
        // }
      } else {
        toast.error('Failed to load permissions');
      }
    } catch (error: any) {
      console.error('Error loading permissions:', error);
      toast.error(`Failed to load permissions: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle permission checkbox change
  const handlePermissionChange = (permissionId: string, type: 'readable' | 'editable', value: boolean) => {
    setPermissionStates(prev => ({
      ...prev,
      [permissionId]: {
        ...prev[permissionId],
        [type]: value
      }
    }));
  };

  // Load permissions on component mount
  useEffect(() => {
    loadPermissions();
  }, []);
  return (
    <div className="grid grid-cols-12 gap-0 overflow-hidden m-[-15px]">
      {/* First part: 8 columns with 2 sub-columns */}
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <div
            className=" flex flex-row items-center cursor-pointer"
            onClick={() => {
              setAddNewPermission(true);
              setPermissionName("");
              onNewPermission?.();
            }}
          >
            <PlusCircleIcon className="w-[22px] h-[22px] ml-4" />
            <p className="text-[12px] font-[400] my-4 mx-1">
              {t(TRANSLATE_KEYS.ACTION, "addNewHRType")}
            </p>
          </div>
          <div className="h-[340px] overflow-y-scroll">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-[12px] font-[400] text-gray-500">Loading permissions...</p>
              </div>
            ) : (
              permissions.map((permission, index) => (
                <div
                  className={`${selectedPermissionType?.name === permission.name ? "bg-[#0E35FF0D]" : "bg-none"} cursor-pointer border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7]`}
                  key={index}
                  onClick={() => {
                    setSelectedPermissionType({id: index + 1, name: permission.name});
                    setPermissionName(permission.name);
                    onSelectPermission?.(permission);
                  }}
                >
                  <p className="text-[12px] font-[400] py-3 mx-4">
                    {permission.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="col-span-8 gap-5">
        <div className="m-4 cursor-pointer">
          <Form {...form}>
            <FormField
              control={form.control}
              name={ePermissionCodeFormKey.Permission}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.LABEL, "permissionName")}
                  </FormLabel>
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      {...field}
                      placeholder={t(
                        TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                        "enterPermission"
                      )}
                      className="border-none"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </div>
        {
          selectedPermissionType?.name != '' &&
           <div className="grid grid-cols-12 px-4 h-[300px] overflow-y-scroll">
            <section className="col-span-3 gap-5">
              <p className="text-[12px] font-[600] py-3 mx-4">{t(TRANSLATE_KEYS.LABEL,"page/permission")}</p>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-[12px] font-[400] text-gray-500">Loading permissions...</p>
                </div>
              ) : (
                permissions.map((permission) => (
                  <p key={permission.id} className="text-[12px] font-[600] py-3 mx-4">
                    {permission.name}
                  </p>
                ))
              )}
            </section>
            <section className="col-span-2 gap-5 flex flex-col items-center">
              <p className="text-[12px] font-[600] pt-3 mx-4">{t(TRANSLATE_KEYS.LABEL,"view")}</p>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-[12px] font-[400] text-gray-500">Loading...</p>
                </div>
              ) : (
                permissions.map((permission) => (
                  <Checkbox
                    key={`${permission.id}-readable`}
                    className="mt-[6px]"
                    checked={permissionStates[permission.id]?.readable || false}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, 'readable', !!checked)}
                    id={`readable-${permission.id}`}
                  />
                ))
              )}
            </section>
            <section className="col-span-2 gap-5 flex flex-col items-center">
              <p className="text-[12px] font-[600] pt-3 mx-4">{t(TRANSLATE_KEYS.LABEL,"edit")}</p>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-[12px] font-[400] text-gray-500">Loading...</p>
                </div>
              ) : (
                permissions.map((permission) => (
                  <Checkbox
                    key={`${permission.id}-editable`}
                    className="mt-[6px]"
                    checked={permissionStates[permission.id]?.editable || false}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, 'editable', !!checked)}
                    id={`editable-${permission.id}`}
                  />
                ))
              )}
            </section>
          </div>
        }
        
      </section>
    </div>
  );
};

export default StaffCodePermission;
