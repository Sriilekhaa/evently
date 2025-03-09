"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  event_id: z.string(),
  name: z.string(),
  email: z.string(),
});

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Field from "@/components/field_input";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event_id: "1",
      name: "",
      email: "",
    },
  });

  const onSubmit = (values) => {
    // TODO: Register for event
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        method="post">
        <input type="hidden" name="event_id" />
        <Field form={form} name="name" type="text" label="Your Name" />
        <Field form={form} name="email" type="email" label="Your Email" />
        <Button className="w-full">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
