import { EyeClosedIcon, EyeOffIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";

import type { UseFormReturn } from "react-hook-form";
import { PolygonIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
import type {
  ClientCodeFormSchema,
  FabricCodeFormSchema,
} from "~/helpers/schemas.helper";
import useAppTranslations from "~/hooks/use-app-translations";
import {
  type FabricCode,
  eDirectPurchaseType,
  eDisContinuedInProductionType,
} from "~/types";
import { eClienttCodeFormKey } from "~/types/enums/form.enum";
import type { ClientCode } from "~/types/models/baseline-information-management/client-code.model";

interface ClientCodeFormProps {
  form: UseFormReturn<ClientCodeFormSchema>;
  data?: ClientCode;
  addNewFabric?: boolean;
  addNewDirectPurchase?: boolean;
  isEdit?: boolean;
  onCancelAction?: () => void;
}
const ClientCodeForm = ({
  form,
  data,
  addNewDirectPurchase,
  isEdit,
  onCancelAction,
}: ClientCodeFormProps) => {
  const { t } = useAppTranslations();
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  
  useEffect(() => {
    if (!commonHelper.isEmpty(data)) {
      setTimeout(() => {
        form.reset({
          [eClienttCodeFormKey.ClientCategory]: data?.clientCategory || data?.clientType || "",
          [eClienttCodeFormKey.CompanyName]: data?.companyName || "",
          [eClienttCodeFormKey.BrandName]: data?.brandName || "",
          [eClienttCodeFormKey.ClientTiers]: data?.clientTiers || "",
          [eClienttCodeFormKey.MainSalesChannel]: data?.mainSalesChannel || {
            market: false,
            officialMall: false,
            platform: [],
            others: false,
            othersText: "",
          },
          [eClienttCodeFormKey.BusinessRegisterationNo]: data?.businessRegisterationNo || data?.businessRegistrationNumber || "",
          [eClienttCodeFormKey.Password]: data?.password || "",
          [eClienttCodeFormKey.BusinessLicense]: data?.businessLicense || "",
          [eClienttCodeFormKey.HeadOfficeAddress]: data?.headOfficeAddress || "",
          [eClienttCodeFormKey.SalesUrl]: data?.salesUrl || "",
          [eClienttCodeFormKey.CompanyEmail]: data?.companyEmail || "",
          [eClienttCodeFormKey.ContactName]: data?.contactName || data?.name || "",
          [eClienttCodeFormKey.RepresentativeTitle]: data?.representativeTitle || "",
          [eClienttCodeFormKey.ContactPerson]: data?.contactPerson || data?.contact || "",
          [eClienttCodeFormKey.GroupChatAgreement]: data?.groupChatAgreement || "",
          [eClienttCodeFormKey.Company]: data?.company || data?.companyName || "",
          [eClienttCodeFormKey.Brand]: data?.brand || data?.brandName || "",
          [eClienttCodeFormKey.Name]: data?.name || data?.contactName || "",
          [eClienttCodeFormKey.Contact]: data?.contact || data?.contactPerson || "",
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
      <form className="flex flex-col gap-[15px]">
        <section className="flex flex-row justify-center  gap-3">
          <section className="w-3/12 ">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.ClientCategory}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "clientCategory")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    onOpenChange={(open) => {
                      if (!open && !field.value) {
                        form.trigger(eClienttCodeFormKey.ClientCategory);
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
                      <SelectItem value="의류브랜드">의류브랜드</SelectItem>
                      <SelectItem value="패션몰">패션몰</SelectItem>
                      <SelectItem value="소매점">소매점</SelectItem>
                      <SelectItem value="도매업체">도매업체</SelectItem>
                      <SelectItem value="온라인마켓">온라인마켓</SelectItem>
                      <SelectItem value="오프라인매장">오프라인매장</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="w-3/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.CompanyName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.REGISTER, "companyName")}
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
          </section>
          <section className="w-3/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.BrandName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.REGISTER, "brandName")}
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
          </section>
          <section className="w-3/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.ClientTiers}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "clientTiers")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    onOpenChange={(open) => {
                      if (!open && !field.value) {
                        form.trigger(eClienttCodeFormKey.ClientTiers);
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
                      <SelectItem value="브론즈">브론즈</SelectItem>
                      <SelectItem value="실버">실버</SelectItem>
                      <SelectItem value="골드">골드</SelectItem>
                      <SelectItem value="플래티넘">플래티넘</SelectItem>
                      <SelectItem value="다이아몬드">다이아몬드</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </section>
        <section className="flex flex-col gap-3">
          <FormLabel isRequired className="text-[12px] my-0 py-0">
            {t(TRANSLATE_KEYS.REGISTER, "mainSalesChannel")}
          </FormLabel>
          {/* <section className=""> */}
          <section className=" flex flex-row mx-1 mt-[-10px]">
            <section className="w-1/2 flex items-center gap-2">
              <section className="w-1/3 flex items-center gap-3">
                <Checkbox
                  checked={false}
                  // onCheckedChange={() => handleDirectPurchaseChange('Y')}
                  // id='direct-purchase-y'
                />
                <label
                  htmlFor="direct-purchase-y"
                  className="text-black-main text-[12px] tracking-[-0.5%] cursor-pointer"
                >
                  {t(TRANSLATE_KEYS.LABEL,"market")}
                </label>
              </section>
              <section className="w-1/3 flex items-center gap-3">
                <Checkbox
                  checked={false}
                  // onCheckedChange={() => handleDirectPurchaseChange('Y')}
                  // id='direct-purchase-y'
                />
                <label
                  htmlFor="direct-purchase-y"
                  className="text-black-main text-[12px] tracking-[-0.5%] cursor-pointer"
                >
                   {t(TRANSLATE_KEYS.LABEL,"officialMall")}
                </label>
              </section>
              <section className="w-1/3 flex items-center gap-3">
                <Checkbox
                  checked={true}
                  // onCheckedChange={() => handleDirectPurchaseChange('Y')}
                  // id='direct-purchase-y'
                />
                <label
                  htmlFor="direct-purchase-y"
                  className="text-black-main text-[12px] tracking-[-0.5%] cursor-pointer"
                >
                   {t(TRANSLATE_KEYS.LABEL,"platform")}
                </label>
              </section>
            </section>
            <section className="w-1/2 flex items-center gap-2">
              <section className="w-1/4 flex items-center gap-3">
                <Checkbox
                  checked={false}
                  // onCheckedChange={() => handleDirectPurchaseChange('Y')}
                  // id='direct-purchase-y'
                />
                <label
                  htmlFor="other-entry"
                  className="text-black-main text-[12px] tracking-[-0.5%] cursor-pointer"
                >
                   {t(TRANSLATE_KEYS.LABEL,"otherEntry")}
                </label>
              </section>

              <div className="flex flex-row w-3/4 items-center gap-2 border rounded-lg">
                <Input
                  placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                  className="border-none"
                />
              </div>
            </section>
          </section>
          {/* </section> */}
          <section className="flex flex-row flex-wrap ml-5">
            {data?.mainSalesChannel?.platform?.map((item, index) => (
              <div className="w-2/12 flex items-center gap-3">
                <Checkbox
                  checked={false}
                  // onCheckedChange={() => handleDirectPurchaseChange('Y')}
                  // id='direct-purchase-y'
                />
                <label
                  htmlFor="other-entry"
                  className="text-black-main py-1 text-[12px] tracking-[-0.5%] cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
          </section>
        </section>
        <section className="flex gap-3">
          <section className="w-4/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.BusinessRegisterationNo}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "businessRegisterationNo")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    onOpenChange={(open) => {
                      if (!open && !field.value) {
                        form.trigger(eClienttCodeFormKey.BusinessRegisterationNo);
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
                      {/* Business registration numbers - will use actual value from data when editing */}
                      <SelectItem value="123-45-67890">123-45-67890</SelectItem>
                      <SelectItem value="123-46-67891">123-46-67891</SelectItem>
                      <SelectItem value="123-47-67892">123-47-67892</SelectItem>
                      <SelectItem value="123-48-67893">123-48-67893</SelectItem>
                      <SelectItem value="123-49-67894">123-49-67894</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="w-4/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.Password}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "password")}
                  </FormLabel>
                  <div className="flex flex-row items-center gap-2 border rounded-lg">
                    <Input
                      {...field}
                      type="password"
                      placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                      className="border-none"
                    />
                    <EyeOffIcon className="w-4 h-4 mr-3" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="w-4/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.BusinessLicense}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "businessLicense")}
                  </FormLabel>
                  <div className="flex gap-3">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                      onOpenChange={(open) => {
                        if (!open && !field.value) {
                          form.trigger(eClienttCodeFormKey.BusinessLicense);
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
                        {/* Business license options */}
                        <SelectItem value="license-1">License 1</SelectItem>
                        <SelectItem value="license-2">License 2</SelectItem>
                        <SelectItem value="license-3">License 3</SelectItem>
                        <SelectItem value="license-4">License 4</SelectItem>
                        <SelectItem value="license-5">License 5</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      className="bg-light-gray border-transparent w-[80px] text-[12px]"
                      onClick={() => onCancelAction?.()}
                    >
                      {t(TRANSLATE_KEYS.ACTION, "selectafile")}
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </section>
        <section className="">
          <FormField
            control={form.control}
            name={eClienttCodeFormKey.HeadOfficeAddress}
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired className="text-[12px]">
                  {t(TRANSLATE_KEYS.REGISTER, "headOfficeAddress")}
                </FormLabel>
                <div className="flex gap-3">
                  <Input
                    {...field}
                    placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                    // className="border-none"
                  />
                  <Button
                    variant="outline"
                    className="bg-black border-transparent w-[80px] text-white text-[12px]"
                    onClick={() => onCancelAction?.()}
                  >
                    {t(TRANSLATE_KEYS.ACTION, "Search")}
                  </Button>
                </div>
                <Input
                  placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                  // className="border-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section className="flex flex-row gap-3">
          <section className="w-6/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.SalesUrl}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "salesUrl")}
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                    // className="border-none"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="w-6/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.CompanyEmail}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "companyEmail")}
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder={t(TRANSLATE_KEYS.INPUT_PLACEHOLDER, "enterContent")}
                    // className="border-none"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </section>
        <section className="flex flex-row justify-center  gap-3">
          <section className="w-3/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.ContactName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.REGISTER, "contactName")}
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
          </section>
          <section className="w-3/12 ">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.RepresentativeTitle}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "representativeTitle")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    onOpenChange={(open) => {
                      if (!open && !field.value) {
                        form.trigger(eClienttCodeFormKey.RepresentativeTitle);
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
                      <SelectItem value="팀장">팀장</SelectItem>
                      <SelectItem value="대리">대리</SelectItem>
                      <SelectItem value="과장">과장</SelectItem>
                      <SelectItem value="차장">차장</SelectItem>
                      <SelectItem value="부장">부장</SelectItem>
                      <SelectItem value="이사">이사</SelectItem>
                      <SelectItem value="상무">상무</SelectItem>
                      <SelectItem value="전무">전무</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="w-3/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.ContactPerson}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className=" text-[12px] ">
                    {t(TRANSLATE_KEYS.REGISTER, "contactPerson")}
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
          </section>
          <section className="w-3/12">
            <FormField
              control={form.control}
              name={eClienttCodeFormKey.GroupChatAgreement}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className="text-[12px]">
                    {t(TRANSLATE_KEYS.REGISTER, "GroupChatAgreement")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    onOpenChange={(open) => {
                      if (!open && !field.value) {
                        form.trigger(eClienttCodeFormKey.GroupChatAgreement);
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
                      <SelectItem value="Y">Y</SelectItem>
                      <SelectItem value="N">N</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </section>
        <section>
          <FormLabel isRequired className="text-[12px] mb-3">
            {t(TRANSLATE_KEYS.REGISTER, "referrerInformation")}
          </FormLabel>
          <section className="flex flex-row justify-center  gap-3">
            <section className="w-3/12">
              <FormField
                control={form.control}
                name={eClienttCodeFormKey.Company}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className=" text-[12px] ">
                      {t(TRANSLATE_KEYS.REGISTER, "company")}
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
            </section>
            <section className="w-3/12 ">
              <FormField
                control={form.control}
                name={eClienttCodeFormKey.Brand}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className="text-[12px]">
                      {t(TRANSLATE_KEYS.REGISTER, "brand")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                      onOpenChange={(open) => {
                        if (!open && !field.value) {
                          form.trigger(eClienttCodeFormKey.Brand);
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
                        {/* Brand options */}
                        <SelectItem value="브랜드A">브랜드A</SelectItem>
                        <SelectItem value="브랜드B">브랜드B</SelectItem>
                        <SelectItem value="브랜드C">브랜드C</SelectItem>
                        <SelectItem value="스타일라인">스타일라인</SelectItem>
                        <SelectItem value="트렌드라인">트렌드라인</SelectItem>
                        <SelectItem value="모던라인">모던라인</SelectItem>
                        <SelectItem value="엘레강스라인">엘레강스라인</SelectItem>
                        <SelectItem value="프리미엄라인">프리미엄라인</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section className="w-3/12">
              <FormField
                control={form.control}
                name={eClienttCodeFormKey.Name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className=" text-[12px] ">
                      {t(TRANSLATE_KEYS.REGISTER, "name")}
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
            </section>
            <section className="w-3/12">
              <FormField
                control={form.control}
                name={eClienttCodeFormKey.Contact}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired className=" text-[12px] ">
                      {t(TRANSLATE_KEYS.REGISTER, "contact")}
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
            </section>
          </section>
        </section>
      </form>
    </Form>
  );
};

export default ClientCodeForm;
