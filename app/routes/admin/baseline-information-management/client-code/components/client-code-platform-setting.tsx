import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TRANSLATE_KEYS } from "~/constants";
import type { PlatformSettingSchema } from "~/helpers";
import useAppTranslations from "~/hooks/use-app-translations";
import {
  ePlatformSettingCodeFormKey,
} from "~/types/enums/form.enum";

interface ClientCodePlatformSettingProps {
  form: UseFormReturn<PlatformSettingSchema>;
}

const ClientCodePlatformSetting = ({ form }: ClientCodePlatformSettingProps) => {
  const { t } = useAppTranslations();
  const [selectedPlatform, setSelectedPlatform] = useState({
    id: 0,
    name: "",
  });
  const [platformName, setPlatformName] = useState<string>("");
  const [addNewPermission, setAddNewPlatform] = useState<boolean>(false);

  const PermissionType = [
    { id: 1, name: "무신사" },
    { id: 2, name: "시장" },
    { id: 3, name: "29센티" },
    { id: 4, name: "브랜디" },
    { id: 5, name: "퀸잇" },
    { id: 6, name: "지그재그" },
    { id: 7, name: "서울스토어" },
    { id: 8, name: "코디북" }
  ];

  return (
    <div className="grid grid-cols-12 gap-0 overflow-hidden m-[-15px]">
      {/* First part: 8 columns with 2 sub-columns */}
      <section className="col-span-4 gap-5 border-r-1 border-r-[#E4E7EC]">
        <div className="flex flex-col">
          <div
            className=" flex flex-row items-center cursor-pointer"
            onClick={() => {
              setAddNewPlatform(true);
              setPlatformName("");
            }}
          >
            <PlusCircleIcon className="w-[22px] h-[22px] ml-4" />
            <p className="text-[12px] font-[400] my-4 mx-1">
              {t(TRANSLATE_KEYS.ACTION, "addNewPlatform")}
            </p>
          </div>
          <div className="h-[340px] overflow-y-scroll">
            {PermissionType?.map((permis, index) => (
              <div
                className={`${selectedPlatform?.id === permis.id ? "bg-[#0E35FF0D]" : "bg-none"} cursor-pointer border-t-1 last:border-b-1 border-b-[#F2F4F7] border-t-[#F2F4F7]`}
                key={index}
                onClick={() => {
                  setSelectedPlatform(permis);
                  setPlatformName(permis.name);
                }}
              >
                <p className="text-[12px] font-[400] py-3 mx-4">
                  {permis.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="col-span-8 gap-5">
        <div className="m-4 cursor-pointer">
          <Form {...form}>
            <FormField
              control={form.control}
              name={ePlatformSettingCodeFormKey.PlatformName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.LABEL, "platformName")}
                  </FormLabel>
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                      placeholder={t(
                        TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                        "enterPlatformName"
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
        
      </section>
    </div>
  );
};

export default ClientCodePlatformSetting;
