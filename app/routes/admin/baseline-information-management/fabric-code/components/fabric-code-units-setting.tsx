import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { CategoryIcon, EditIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TRANSLATE_KEYS } from "~/constants";
import type { UnitsSettingSchema } from "~/helpers";
import useAppTranslations from "~/hooks/use-app-translations";
import { eUnitsSettingCodeFormKey } from "~/types/enums/form.enum";

interface FabricCodeUnitsSettingProps {
  form: UseFormReturn<UnitsSettingSchema>;
}



const FabricCodeUnitsSetting = ({
  form,
}: FabricCodeUnitsSettingProps) => {
  const { t } = useAppTranslations();
  const [ selectedUnitType, setSelectedUnitType ] = useState({
    id:1, name: t(TRANSLATE_KEYS.REGISTER,'prodUnits'), units : 'YD'
  })
  const [ unitName, setUnitName ] = useState<string>('');
  const [ addNewUnit, setAddNewUnit ] = useState<boolean>(false);

  const UnitTypes=[
  {id:1, name: t(TRANSLATE_KEYS.REGISTER,'prodUnits'), units : 'YD'},
  {id:2, name: t(TRANSLATE_KEYS.REGISTER,'saleUnits'), units : 'KG'},
  {id:3, name: t(TRANSLATE_KEYS.REGISTER,'prodSpec'), units : 'EA'},
]

  return (
    <div className="grid grid-cols-12 gap-0 overflow-hidden m-[-15px]">
      {/* First part: 8 columns with 2 sub-columns */}
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <p className="text-[12px] font-[600] my-4 mx-4">{t(TRANSLATE_KEYS.TITLE,'selectUnitType')}</p>
          <div className="h-[260px] overflow-y-scroll">
            {
              UnitTypes?.map((unitType,index) => (
                <div className={`${selectedUnitType?.id === unitType.id ? 'bg-[#0E35FF0D]' : 'bg-none' } cursor-pointer border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7]`} key={index} onClick={()=>{setSelectedUnitType(unitType);setUnitName(unitType.units) }} >
                  <p className="text-[12px] font-[400] py-3 mx-4">
                    {unitType.name}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <div className=" flex flex-row items-center cursor-pointer" onClick={()=>{setAddNewUnit(true); setUnitName('')}}>
            <PlusCircleIcon className='w-[22px] h-[22px] ml-4' />
            <p className="text-[12px] font-[400] my-4 mx-1">
              {t(TRANSLATE_KEYS.ACTION,'newUnit')}
            </p>
          </div>
          <div className="h-[260px] overflow-y-scroll">
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewUnit && selectedUnitType?.units === 'KG' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedUnitType({...selectedUnitType, units: 'KG'}); setUnitName('KG'); setAddNewUnit(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                KG
              </p>
            </div>
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewUnit && selectedUnitType?.units === 'YD' ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedUnitType({...selectedUnitType, units: 'YD'}); setUnitName('YD'); setAddNewUnit(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                YD
              </p>
            </div>
            <div className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewUnit && selectedUnitType?.units === "EA" ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedUnitType({...selectedUnitType, units: 'EA'}); setUnitName('EA'); setAddNewUnit(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                EA
              </p>
            </div>
            
            <div className={`cursor-pointer border-y-1 border-t-[#F2F4F7] border-b-[#F2F4F7] ${!addNewUnit && selectedUnitType?.units === "벌" ? 'bg-[#0E35FF0D]' : 'bg-none'}`} onClick={()=>{ setSelectedUnitType({...selectedUnitType, units: '벌'}); setUnitName('벌'); setAddNewUnit(false) }}>
              <p className="text-[12px] font-[400] py-3 mx-4">
                {t(TRANSLATE_KEYS.LABEL,'set')}
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
              name={eUnitsSettingCodeFormKey.UnitName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.LABEL, "unitName")}
                  </FormLabel>
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      value={unitName}
                      // disabled={isEdit}
                      onChange={(e)=>setUnitName(e.target.value)}
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

export default FabricCodeUnitsSetting;
