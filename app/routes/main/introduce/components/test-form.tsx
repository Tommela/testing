import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { DATA } from '~/constants'
import { type TestFormSchema, getTestSchema } from '~/helpers/schemas.helper'
import { eTestFormKey } from '~/types/enums/form.enum'

const TestForm = () => {
  const { t } = useTranslation()
  const formSchema = getTestSchema(t)
  const form = useForm<TestFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [eTestFormKey.Username]: '',
      [eTestFormKey.Quantity]: '',
      [eTestFormKey.Status]: undefined,
      [eTestFormKey.Items]: [],
      [eTestFormKey.Bio]: '',
      [eTestFormKey.Email]: ''
    },
    mode: 'all'
  })

  const status = useWatch({
    control: form.control,
    name: eTestFormKey.Status
  })

  const onSubmit = (values: TestFormSchema) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.trigger()
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {/* Price */}
        <FormField
          control={form.control}
          name={eTestFormKey.Quantity}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  inputMode='numeric'
                  placeholder='Placeholder'
                  onKeyDown={(e) => {
                    const disallowed = ['e', '.', '-', ',']
                    if (disallowed.includes(e.key)) e.preventDefault()
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Radio group */}
        <FormField
          control={form.control}
          name={eTestFormKey.Status}
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col'>
                  {DATA.GET_STATUS(t).map((item) => {
                    return (
                      <FormItem className='flex items-center gap-3' key={item?.value}>
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className='font-normal'>{item.label}</FormLabel>
                      </FormItem>
                    )
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        {status === 'PENDING' && (
          <FormField
            control={form.control}
            name={eTestFormKey.Username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Checkbox */}
        <FormField
          control={form.control}
          name={eTestFormKey.Items}
          render={() => (
            <FormItem>
              <div className='mb-3'>
                <FormLabel className='text-base'>Sidebar</FormLabel>
              </div>
              <section className='flex items-center gap-3'>
                {DATA.GET_ITEMS(t).map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={eTestFormKey.Items}
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className='flex items-center gap-2'>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(field.value?.filter((value) => value !== item.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-sm font-normal'>{item.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </section>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Text area */}
        <FormField
          control={form.control}
          name={eTestFormKey.Bio}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea className='h-[100px]' placeholder='Tell us a little bit about yourself' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select */}
        <FormField
          control={form.control}
          name={eTestFormKey.Email}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                value={field.value}
                onOpenChange={(open) => {
                  if (!open && !field.value) {
                    form.trigger(eTestFormKey.Email)
                  }
                }}
              >
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DATA.GET_EMAIL_OPTIONS(t).map((item) => {
                    return (
                      <SelectItem key={item?.value} value={item.value}>
                        {item?.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='button'
          disabled={!form.formState.isValid}
          onClick={() => {
            console.log('values: ', form.getValues())
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default TestForm
