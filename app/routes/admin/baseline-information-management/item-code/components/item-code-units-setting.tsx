import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TRANSLATE_KEYS } from "~/constants";
import type { UnitsSettingSchema } from "~/helpers";
import useAppTranslations from "~/hooks/use-app-translations";
import { eUnitsSettingCodeFormKey } from "~/types/enums/form.enum";

interface ItemCodeUnitsSettingProps {
  form: UseFormReturn<UnitsSettingSchema>;
}

const ItemCodeUnitsSetting = ({
  form,
}: ItemCodeUnitsSettingProps) => {
  const { t } = useAppTranslations();
  const [selectedUnitType, setSelectedUnitType] = useState({
    id: 1, name: t(TRANSLATE_KEYS.REGISTER, 'prodUnits'), defaultUnit: 'YD'
  });
  const [selectedUnit, setSelectedUnit] = useState<string>('YD');
  const [addNewUnit, setAddNewUnit] = useState<boolean>(false);

  const UnitTypes = [
    { id: 1, name: t(TRANSLATE_KEYS.REGISTER, 'prodUnits'), defaultUnit: 'YD' },
    { id: 2, name: t(TRANSLATE_KEYS.REGISTER, 'saleUnits'), defaultUnit: 'KG' },
  ];

  // Get form value to use as source of truth
  const formValue = form.watch(eUnitsSettingCodeFormKey.UnitName);
  
  // Initialize form with default value on mount only
  useEffect(() => {
    const currentValue = form.getValues(eUnitsSettingCodeFormKey.UnitName);
    if (!currentValue) {
      form.setValue(eUnitsSettingCodeFormKey.UnitName, 'YD', { shouldValidate: true });
      setSelectedUnit('YD');
    } else {
      setSelectedUnit(currentValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const handleUnitTypeClick = (unitType: typeof UnitTypes[0]) => {
    setSelectedUnitType(unitType);
    const newUnitName = unitType.defaultUnit;
    setSelectedUnit(newUnitName);
    form.setValue(eUnitsSettingCodeFormKey.UnitName, newUnitName, { shouldValidate: true });
    setAddNewUnit(false);
  };

  const handleUnitClick = (unit: string) => {
    setSelectedUnit(unit);
    form.setValue(eUnitsSettingCodeFormKey.UnitName, unit, { shouldValidate: true });
    setAddNewUnit(false);
  };

  const handleAddNewUnitClick = () => {
    setAddNewUnit(true);
    setSelectedUnit('');
    form.setValue(eUnitsSettingCodeFormKey.UnitName, '', { shouldValidate: true });
  };

  return (
    <div className="grid grid-cols-12 gap-0 overflow-hidden m-[-15px]">
      {/* First part: Select a unit type */}
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <p className="text-[12px] font-[600] my-4 mx-4">{t(TRANSLATE_KEYS.TITLE, 'selectUnitType')}</p>
          <div className="h-[260px] overflow-y-scroll">
            {UnitTypes?.map((unitType, index) => (
              <div
                className={`${selectedUnitType?.id === unitType.id ? 'bg-[#0E35FF0D]' : 'bg-none'} cursor-pointer border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7]`}
                key={index}
                onClick={() => handleUnitTypeClick(unitType)}
              >
                <p className="text-[12px] font-[400] py-3 mx-4">
                  {unitType.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Second part: Select a unit */}
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <div className="flex flex-row items-center cursor-pointer" onClick={handleAddNewUnitClick}>
            <PlusCircleIcon className='w-[22px] h-[22px] ml-4' />
            <p className="text-[12px] font-[400] my-4 mx-1">
              {t(TRANSLATE_KEYS.ACTION, 'newUnit')}
            </p>
          </div>
          <div className="h-[260px] overflow-y-scroll">
            <div
              className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewUnit && selectedUnit === 'KG' ? 'bg-[#0E35FF0D]' : 'bg-none'}`}
              onClick={() => handleUnitClick('KG')}
            >
              <p className="text-[12px] font-[400] py-3 mx-4">
                KG
              </p>
            </div>
            <div
              className={`cursor-pointer border-t-1 border-t-[#F2F4F7] ${!addNewUnit && selectedUnit === 'YD' ? 'bg-[#0E35FF0D]' : 'bg-none'}`}
              onClick={() => handleUnitClick('YD')}
            >
              <p className="text-[12px] font-[400] py-3 mx-4">
                YD
              </p>
            </div>
            <div
              className={`cursor-pointer border-y-1 border-t-[#F2F4F7] border-b-[#F2F4F7] ${!addNewUnit && selectedUnit === "EA" ? 'bg-[#0E35FF0D]' : 'bg-none'}`}
              onClick={() => handleUnitClick('EA')}
            >
              <p className="text-[12px] font-[400] py-3 mx-4">
                EA
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Third part: Unit name input */}
      <section className="col-span-4 gap-5">
        <div className="m-4 cursor-pointer">
          <Form {...form}>
            <FormField
              control={form.control}
              name={eUnitsSettingCodeFormKey.UnitName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px] font-[600]">
                    {t(TRANSLATE_KEYS.LABEL, "unitName")}
                  </FormLabel>
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      {...field}
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

export default ItemCodeUnitsSetting;

