import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { CategoryIcon, EditIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TRANSLATE_KEYS } from "~/constants";
import { getClientTierSettingSchema, type ClientTierSettingSchema, type UnitsSettingSchema } from "~/helpers";
import useAppTranslations from "~/hooks/use-app-translations";
import { eClientTierSettingCodeFormKey, eUnitsSettingCodeFormKey } from "~/types/enums/form.enum";

interface ClientTierSettingProps {
  form: UseFormReturn<ClientTierSettingSchema>;
}



const ClientTierSetting = ({
  form,
}: ClientTierSettingProps) => {
  const { t } = useAppTranslations();
  const [ selectedClientType, setSelectedClientType ] = useState({
    id:1, name: t(TRANSLATE_KEYS.FORM,'clientTiers'), units : 'Bronze'
  })
  const [ clientSettingName, setClientSettingName ] = useState<string>('');
  const [ addNewSetting, setAddNewSetting ] = useState<boolean>(false);

  const ClientTypes=[
  {id:1, name: t(TRANSLATE_KEYS.FORM,'clientTiers'), units : 'Bronze'},
  {id:2, name: t(TRANSLATE_KEYS.FORM,'jobTitle'), units : 'Diamond'},
]

  return (
    <div className="grid grid-cols-12 gap-0 overflow-hidden m-[-15px]">
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <p className="text-[12px] font-[600] my-4 mx-4">{t(TRANSLATE_KEYS.TITLE,'selectClientTierSetting')}</p>
          <div className="h-[260px] overflow-y-scroll">
            {
              ClientTypes?.map((settingType,index) => (
                <div className={`${selectedClientType?.id === settingType.id ? 'bg-[#0E35FF0D]' : 'bg-none' } cursor-pointer border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7]`} key={index} onClick={()=>{setSelectedClientType(settingType);setClientSettingName(settingType.units) }} >
                  <p className="text-[12px] font-[400] py-3 mx-4">
                    {settingType.name}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <div className=" flex flex-row items-center cursor-pointer" onClick={()=>{setAddNewSetting(true); setClientSettingName('')}}>
            <PlusCircleIcon className='w-[22px] h-[22px] ml-4' />
            <p className="text-[12px] font-[400] my-4 mx-1">
              {t(TRANSLATE_KEYS.ACTION,'newUnit')}
            </p>
          </div>
          <div className=" h-[260px] overflow-y-scroll">
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewSetting && selectedClientType?.units === 'Bronze' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedClientType({...selectedClientType, units: 'Bronze'}); setClientSettingName('Bronze'); setAddNewSetting(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                Bronze
              </p>
            </div>
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewSetting && selectedClientType?.units === 'Silver' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedClientType({...selectedClientType, units: 'Silver'}); setClientSettingName('Silver'); setAddNewSetting(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                Silver
              </p>
            </div>
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewSetting && selectedClientType?.units === 'Gold' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedClientType({...selectedClientType, units: 'Gold'}); setClientSettingName('Gold'); setAddNewSetting(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                Gold
              </p>
            </div>
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewSetting && selectedClientType?.units === 'Platinum' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedClientType({...selectedClientType, units: 'Platinum'}); setClientSettingName('Platinum'); setAddNewSetting(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                Platinum
              </p>
            </div>
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewSetting && selectedClientType?.units === 'Diamond' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedClientType({...selectedClientType, units: 'Diamond'}); setClientSettingName('Diamond'); setAddNewSetting(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                Diamond
              </p>
            </div>
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewSetting && selectedClientType?.units === 'BlackDia' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedClientType({...selectedClientType, units: 'BlackDia'}); setClientSettingName('BlackDia'); setAddNewSetting(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                BlackDia
              </p>
            </div>
            
          </div>
        </div>
      </section>
      <section className="col-span-4 gap-5">
        <div className="m-4 cursor-pointer">
          <Form {...form}>
            <FormField
              control={form.control}
              name={eClientTierSettingCodeFormKey.TierName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.LABEL, "tierName")}
                  </FormLabel>
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      value={clientSettingName}
                      // disabled={isEdit}
                      onChange={(e)=>setClientSettingName(e.target.value)}
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
  );
};

export default ClientTierSetting;
