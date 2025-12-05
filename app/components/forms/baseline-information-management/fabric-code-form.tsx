import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import type { UseFormReturn } from "react-hook-form";
import { PolygonIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { DATA, TRANSLATE_KEYS } from "~/constants";
import { commonHelper } from "~/helpers";
import type { FabricCodeFormSchema } from "~/helpers/schemas.helper";
import useAppTranslations from "~/hooks/use-app-translations";
import {
  type FabricCode,
  eDirectPurchaseType,
  eDisContinuedInProductionType,
} from "~/types";
import { eFabricCodeFormKey } from "~/types/enums/form.enum";

interface FabricCodeFormProps {
  form: UseFormReturn<FabricCodeFormSchema>;
  data?: FabricCode;
  addNewFabric?: boolean;
  addNewDirectPurchase?: boolean;
  isEdit?: boolean;
  onCancelAction?: () => void;
}
const FabricCodeForm = ({
  form,
  data,
  addNewFabric,
  addNewDirectPurchase,
  isEdit,
  onCancelAction
}: FabricCodeFormProps) => {
  const { t } = useAppTranslations();
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  useEffect(() => {
    if (!commonHelper.isEmpty(data)) {
      setTimeout(() => {
        form.reset({
          [eFabricCodeFormKey.DirectPurchase]:
            data?.directPurchase === "Y"
              ? eDirectPurchaseType.Y
              : eDirectPurchaseType.N,
          [eFabricCodeFormKey.FabricPart]: data?.fabricPart || "",
          [eFabricCodeFormKey.ItemName]: data?.itemName || "",
          [eFabricCodeFormKey.PrintDesign]: data?.printDesign || "",
          [eFabricCodeFormKey.Color]: data?.color || "",
          [eFabricCodeFormKey.BtNo]: data?.btNo || "",
          [eFabricCodeFormKey.ProdSpec]: data?.prodSpec || "",
          [eFabricCodeFormKey.ProdCost]: data?.prodCost || "",
          [eFabricCodeFormKey.ProdUnits]: data?.prodUnits || "",
          [eFabricCodeFormKey.SaleUnits]: data?.saleUnits || "",
          [eFabricCodeFormKey.DiscontinuedInProd]:
            data?.discontinuedInProd || eDisContinuedInProductionType.N,
          [eFabricCodeFormKey.Loss]: data?.loss || "",
          [eFabricCodeFormKey.Remarks]: data?.remarks || "",
        });
      });
    }
  }, [data]);

  const handleClickFabric = (id: string) => {
    console.log("Clicked fabric id: ", id);
    setSelectedFabric(id.toString());
  };
  return (
    <Form {...form}>
      <div className="grid grid-cols-12 gap-0  overflow-hidden mt-[-15px] ml-[-30px]">
        {/* First part: 8 columns with 2 sub-columns */}
        <section className="col-span-9 pr-4 bg-[#FBFBFB] gap-5 ml-[15px] pb-5">
          <h3 className="text-lg font-semibold p-4">
            {t(TRANSLATE_KEYS.TITLE, "selectAndSearchFabric")}
          </h3>
          <div className="grid grid-cols-12 gap-5 h-full relative ml-[15px]">
            {/* Left sub-column */}
            <div className="col-span-5 flex flex-col border rounded-lg h-[600px] bg-white ">
              <div className=" flex flex-row gap-2 py-4 px-3 m-0 items-start">
                <div className="flex-1 w-1/3 relative min-w-0">
                  <FormField
                    control={form.control}
                    name={eFabricCodeFormKey.FabricPart}
                    render={({ field }) => (
                      <FormItem className="">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                          onOpenChange={(open) => {
                            if (!open && !field.value) {
                              form.trigger(eFabricCodeFormKey.FabricPart);
                            }
                          }}
                        >
                          {/* <FormControl className=""> */}
                          <SelectTrigger iconCustom>
                            <SelectValue
                              placeholder={t(
                                TRANSLATE_KEYS.ENUMS,
                                "filtersPlaceholder.fabricCode.typeOfFabricPart"
                              )}
                            />
                          </SelectTrigger>
                          {/* </FormControl> */}
                          <SelectContent>
                            {/* {DATA.GET_DIRECT_PURCHASE_TYPE_OPTIONS(t).map(
                                (item) => {
                                  return (
                                    <SelectItem
                                      key={item?.value}
                                      value={item.value}
                                    >
                                      {item?.label}
                                    </SelectItem>
                                  );
                                }
                              )} */}
                            <SelectItem value="raw-a">BodyBoard</SelectItem>
                            <SelectItem value="raw-b">BodyBoard</SelectItem>
                            <SelectItem value="raw-c">BodyBoard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1  min-w-0">
                  {/* <FormField
                    control={form.control}
                    name={eFabricCodeFormKey.ItemName}
                    render={({ field }) => (
                      <FormItem className=""> */}
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      placeholder={t(
                        TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                        "searchItemName"
                      )}
                      className="border-none"
                    />
                    <Search className="w-5 h-5 text-gray-600 mr-[10px]" />
                  </div>
                  {/* </FormItem>
                    )}
                  /> */}
                </div>
              </div>

              <div className="border grid grid-cols-12 gap-5 m-0 bg-[#F4f5ff] items-start ">
                <div className="col-span-4  border-2 border-[#F2F4F7]">
                  <p className="text-[12px] font-[600] my-1 mx-4">
                    {t(TRANSLATE_KEYS.ENUMS, "filters.fabricCode.fabricPart")}
                  </p>
                </div>
                <div className="col-span-8 border-2 border-[#F2F4F7]">
                  <p className="text-[12px] font-[600] my-1 mx-4">
                    {t(TRANSLATE_KEYS.ENUMS, "filters.fabricCode.itemName")}
                  </p>
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {new Array(10).fill(null).map((_, index) => (
                  <div
                    className={`grid grid-cols-12 gap-5 cursor-pointer items-center border-b-[#F2F4F7] border-0 last:border-b-1 ${selectedFabric === index.toString() ? "bg-[#00C6A21A]" : ""}`}
                    key={index}
                    onClick={() => handleClickFabric(index.toString())}
                  >
                    <div className="col-span-4  ">
                      <p className="text-[12px] font-[400] my-2 mx-4">
                        BodyBoard
                      </p>
                    </div>
                    <div className="col-span-8 border-l-2 py-1 border-[#F2F4F7]">
                      {addNewDirectPurchase ? (
                        DATA.GET_BUY_SALE_TAG(t)?.map((item, index) => {
                          return (
                            <section
                              className="flex items-center justify-start gap-[5px] pl-[10px] my-1"
                              key={index}
                            >
                              <div
                                className="rounded-[10px] px-[5px] py-[1px] text-[11px] font-[600] text-white leading-[20px] tracking-[-0.5%]"
                                style={{ backgroundColor: item.color }}
                              >
                                {item.name}
                              </div>
                              <p className="text-[12px] font-[400]">
                                Item Name
                              </p>
                            </section>
                          );
                        })
                      ) : (
                        <p className="text-[12px] font-[400] my-2 mx-4">
                          Item Name
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-5/12 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <PolygonIcon />
            </div>
            <div className="col-span-7 flex flex-col ">
              <div className="border flex flex-col rounded-lg p-4 h-[600px] bg-white">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.DirectPurchase}
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-row items-center gap-2 border rounded-lg">
                        <Input
                          placeholder={t(
                            TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                            "searchColor/PrintDesign"
                          )}
                          className="border-none"
                        />
                        <Search className="w-5 h-5 text-gray-600 mr-[10px]" />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="border flex flex-row m-0 py-[2px] bg-[#F4f5ff] items-start mt-4 mx-[-16px]">
                  <div className="flex-1 border-r-2 border-[#F2F4F7]">
                    <p className="text-[12px] font-[600] my-1 mx-4">
                      {t(TRANSLATE_KEYS.ENUMS, "table.fabricCode.printDesign")}
                    </p>
                  </div>
                  <div className="flex-1 border-r-2 border-[#F2F4F7]">
                    <p className="text-[12px] font-[600] my-1 mx-4">
                      {" "}
                      {t(TRANSLATE_KEYS.ENUMS, "table.fabricCode.color")}
                    </p>
                  </div>
                  <div className="flex-1 border-r-2 border-[#F2F4F7]">
                    <p className="text-[12px] font-[600] my-1 mx-4">
                      {t(TRANSLATE_KEYS.ENUMS, "table.fabricCode.prodUnits")}
                    </p>
                  </div>
                  <div className="flex-1 border-r-2 border-[#F2F4F7]">
                    <p className="text-[12px] font-[600] my-1 mx-4">
                      {t(TRANSLATE_KEYS.ENUMS, "table.fabricCode.saleUnits")}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-[600] my-1 mx-4">
                      {t(TRANSLATE_KEYS.ENUMS, "table.fabricCode.prodCost")}
                    </p>
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 overflow-x-hidden">
                  {new Array(45).fill(null).map((_, index) => (
                    <div
                      className=" flex flex-row m-0  items-start mx-[-16px]"
                      key={index}
                    >
                      <div className="flex-1 border-r-2 border-[#F2F4F7] border-y-0">
                        <p className="text-[12px] font-[400] my-[10px] mx-4">
                          Design A
                        </p>
                      </div>
                      <div className="flex-1 border-r-2 border-[#F2F4F7] border-y-0">
                        <p className="text-[12px] font-[400] my-[10px] mx-4">
                          Black
                        </p>
                      </div>
                      <div className="flex-1 border-r-2 border-[#F2F4F7] border-y-0">
                        <p className="text-[12px] font-[400] my-[10px] mx-4">
                          KG
                        </p>
                      </div>
                      <div className="flex-1 border-r-2 border-[#F2F4F7] border-y-0">
                        <p className="text-[12px] font-[400] my-[10px] mx-4">
                          YD
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[12px] font-[400] my-[10px] mx-4">
                          $1000
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="col-span-3 justify-center">
          <div className="flex flex-col gap-4 pl-4 pt-4">
            <h3 className="text-lg font-semibold">
              {t(TRANSLATE_KEYS.TITLE, "newFabric")}
            </h3>
            <div className="grid grid-cols-12 m-0 gap-3">
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.DirectPurchase}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className=" text-[12px] ">
                        {t(TRANSLATE_KEYS.REGISTER, "directPurchase")}
                      </FormLabel>
                      <Select
                        value={addNewDirectPurchase ? "Y" : "N"}
                        
                        // onValueChange={(newValue: 'Y' | 'N') => {
                        //   onDiscontinuedChange?.(row.original, newValue)
                        // }}
                      >
                        <SelectTrigger className="w-full h-8 bg-gray-100 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y">Y</SelectItem>
                          <SelectItem value="N">N</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-7">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.ItemName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className=" text-[12px] ">
                        {t(TRANSLATE_KEYS.REGISTER, "itemName")}
                      </FormLabel>
                      <div className="flex flex-row items-center gap-2 border rounded-lg">
                        <Input
                          value={"Item Name"}
                          disabled={isEdit}
                          placeholder={t(TRANSLATE_KEYS.REGISTER, "itemName")}
                          className="border-none"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="">
              <FormField
                control={form.control}
                name={eFabricCodeFormKey.PrintDesign}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className=" text-[12px] ">
                      {t(TRANSLATE_KEYS.REGISTER, "printDesign")}
                    </FormLabel>
                    <div className="flex flex-row items-center gap-2 border rounded-lg">
                      <Input
                        placeholder={t(
                          TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                          "enterContent"
                        )}
                        className="border-none"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-12 m-0 gap-3">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.Color}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className=" text-[12px] ">
                        {t(TRANSLATE_KEYS.REGISTER, "color")}
                      </FormLabel>
                      <div className="flex flex-row items-center gap-2 border rounded-lg">
                        <Input
                          placeholder={t(
                            TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                            "enterContent"
                          )}
                          className="border-none"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.BtNo}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className=" text-[12px] ">
                        {t(TRANSLATE_KEYS.REGISTER, "btNo")}
                      </FormLabel>
                      <div className="flex flex-row items-center gap-2 border rounded-lg">
                        <Input
                          placeholder={t(
                            TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                            "enterContent"
                          )}
                          className="border-none"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex-1 w-1/3 relative min-w-0">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.ProdSpec}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className="text-[12px]">
                        {t(TRANSLATE_KEYS.REGISTER, "prodSpec")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        onOpenChange={(open) => {
                          if (!open && !field.value) {
                            form.trigger(eFabricCodeFormKey.ProdSpec);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full max-w-full overflow-hidden">
                            <SelectValue
                              placeholder={t(
                                TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                                "select"
                              )}
                              className="truncate"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="raw-a">Raw A</SelectItem>
                          <SelectItem value="raw-b">Raw B</SelectItem>
                          <SelectItem value="raw-c">Raw C</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.ProdCost}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className="text-[12px]">
                        {t(TRANSLATE_KEYS.REGISTER, "prodCost")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={"0"}
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.ProdUnits}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className="text-[12px]">
                        {t(TRANSLATE_KEYS.REGISTER, "prodUnits")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        onOpenChange={(open) => {
                          if (!open && !field.value) {
                            form.trigger(eFabricCodeFormKey.ProdUnits);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full max-w-full overflow-hidden">
                            <SelectValue
                              placeholder={t(
                                TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                                "select"
                              )}
                              className="truncate"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="raw-a">Raw A</SelectItem>
                          <SelectItem value="raw-b">Raw B</SelectItem>
                          <SelectItem value="raw-c">Raw C</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 m-0 gap-3">
              <div className="col-span-7">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.SaleUnits}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className="text-[12px]">
                        {t(TRANSLATE_KEYS.REGISTER, "saleUnits")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        onOpenChange={(open) => {
                          if (!open && !field.value) {
                            form.trigger(eFabricCodeFormKey.SaleUnits);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full max-w-full overflow-hidden">
                            <SelectValue
                              placeholder={t(
                                TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                                "select"
                              )}
                              className="truncate"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="raw-a">Raw A</SelectItem>
                          <SelectItem value="raw-b">Raw B</SelectItem>
                          <SelectItem value="raw-c">Raw C</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name={eFabricCodeFormKey.DiscontinuedInProd}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired className=" text-[12px] ">
                        {t(TRANSLATE_KEYS.REGISTER, "discontinuedInProd")}
                      </FormLabel>
                      <Select
                        value={"N"}
                        // onValueChange={(newValue: 'Y' | 'N') => {
                        //   onDiscontinuedChange?.(row.original, newValue)
                        // }}
                      >
                        <SelectTrigger className="w-full h-8 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y">Y</SelectItem>
                          <SelectItem value="N">N</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="">
              <FormField
                control={form.control}
                name={eFabricCodeFormKey.Loss}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className=" text-[12px] ">
                      {t(TRANSLATE_KEYS.REGISTER, "loss")}
                    </FormLabel>
                    <div className="flex flex-row items-center gap-2 border rounded-lg">
                      <Input placeholder={"0.0"} className="border-none" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name={eFabricCodeFormKey.Remarks}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-[12px] ">
                      {t(TRANSLATE_KEYS.REGISTER, "remarks")}
                    </FormLabel>
                    <div className="flex flex-row items-center gap-2 border rounded-lg">
                      <Input
                        placeholder={t(
                          TRANSLATE_KEYS.INPUT_PLACEHOLDER,
                          "enterContent"
                        )}
                        className="border-none"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <section className="flex-1 flex items-center justify-center gap-space-main py-4 mt-4 border-gray-200 border-t-1 ">
            <Button
              variant="outline"
              className="bg-light-gray border-transparent w-[110px]"
              onClick={() => onCancelAction?.()}
            >
              {t(TRANSLATE_KEYS.ACTION, "cancel")}
            </Button>
            <Button
              // onClick={() => onOkAction?.()} disabled={disabledOkBtn}
              className="w-[110px]"
            >
              {t(TRANSLATE_KEYS.ACTION, isEdit ? "save" : "add")}
            </Button>
          </section>
        </section>
      </div>
    </Form>
  );
};

export default FabricCodeForm;
