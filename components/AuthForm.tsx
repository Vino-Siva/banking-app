"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CustomFormField from "./CustomFormField";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      state: "",
      postalCode: "",
      ssn: "",
      dob: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Need to Sign up with Appwrite and create a Plaid link token

      if (type === "sign-up") {
        // const newUser = await signUp(data);
        // setUser(newUser);
      }
      if (type === "sign-in") {
        // const res = await signIn(
        //   email: data.email,
        //   password: data.password,
        // );
        // if (res) router.push("/");
      }
    } catch (error) {
      console.error("Unable to submit AuthForm: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex items-center cursor-pointer gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="VBS logo"
            className="size-[24px] max-xl:size-[14px]"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            VBS
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-14 lg:text-16 text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details to get started"}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      name="firstName"
                      placeholder="Your First Name"
                      autoComplete="on"
                      label="First Name"
                    />
                    <CustomFormField
                      control={form.control}
                      name="lastName"
                      placeholder="Your Last Name"
                      autoComplete="on"
                      label="Last Name"
                    />
                  </div>
                  <CustomFormField
                    control={form.control}
                    name="address1"
                    placeholder="Your Address"
                    autoComplete="on"
                    label="Address"
                  />
                  <CustomFormField
                    control={form.control}
                    name="city"
                    placeholder="Your City"
                    autoComplete="on"
                    label="City"
                  />
                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      name="state"
                      placeholder="Your State"
                      autoComplete="on"
                      label="State"
                    />
                    <CustomFormField
                      control={form.control}
                      name="postalCode"
                      placeholder="11101"
                      autoComplete="on"
                      label="Postal Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomFormField
                      control={form.control}
                      name="dob"
                      placeholder="yyyy-mm-dd"
                      autoComplete="off"
                      label="Date of Birth"
                    />
                    <CustomFormField
                      control={form.control}
                      name="ssn"
                      placeholder="Your SSN"
                      autoComplete="off"
                      label="SSN"
                    />
                  </div>
                </>
              )}
              <CustomFormField
                control={form.control}
                name="email"
                placeholder="Your Email Address"
                autoComplete="on"
                label="Email"
              />

              <CustomFormField
                control={form.control}
                name="password"
                placeholder="Your Password"
                autoComplete="on"
                label="Password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
