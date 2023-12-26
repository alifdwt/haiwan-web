import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  birthdate: z.date({ required_error: "Please select a date of birth." }),
  gender: z.string({ required_error: "Please select a gender." }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z.string({
    required_error: "Please select a phone number to display.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const GeneralForm = ({ session }: { session: any }) => {
  const defaultValues = {
    name: session?.user?.name || "",
    birthdate: session?.user?.birthdate || "",
    email: session?.user?.email || "",
    phone: session?.user?.phone || "",
    gender: session?.user?.gender || "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: ProfileFormValues) {
    console.log(values);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-1">
        <CardHeader className="flex gap-2 justify-center items-center">
          <Image
            src={session?.user?.image || ""}
            alt={session?.user?.name || ""}
            width={200}
            height={200}
          />
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            Edit Photo
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            Maximum upload size: 10MB
          </p>
          <p className="text-sm text-muted-foreground">
            Allowed file types: PNG, JPG, GIF
          </p>
        </CardFooter>
      </Card>
      <Card className="col-span-2 border-0 shadow-none">
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Update your account settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription className="text-right">
                      Your full name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              new Date(field.value).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            ) : (
                              <span>Pick a birthdate</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={form.formState.isSubmitting}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-right">
                      Your birthdate.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="text-right">
                      Your gender.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              <h4 className="font-bold">Contact</h4>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription className="text-right">
                      Your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormDescription className="text-right">
                      Your phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              <Button type="submit">Update</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralForm;
