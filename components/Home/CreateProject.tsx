"use client";
import { useMutation } from "@/hooks";
import { Dialog } from "@mui/material";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../core/Button";
import CustomInputField from "../core/CustomInputField";
import { toast } from "sonner";
const CreateProject = ({
  open,
  setOpen,
  projectMutate,
  userId,
}: {
  open: boolean;
  setOpen: () => void;
  projectMutate: () => void;
  userId: string;
}) => {
  const { isLoading, mutation } = useMutation();
  const Schema = [
    {
      key: "1",
      label: "Project Name *",
      name: "projectName",
      type: "text",
      initialValue: "",
      className: "col-span-12",
      validationSchema: Yup.string().required("Required"),
    },
  ];
  const initialValues = Schema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = Schema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  }, {});
  const handleOperation = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const res = await mutation(`projects/create_project`, {
        method: "POST",
        body: {
          user_id: userId,
          project_name: values?.projectName,
        },
      });
      if (res?.status === 200) {
        toast.success("Project created successfully");
        resetForm();
        setOpen();
        projectMutate();
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      maxWidth="xl"
      PaperProps={{
        style: {
          borderRadius: 10,
          background: "transparent",
          boxShadow: "none",
          border: "1px solid #272727",
        },
      }}
    >
      <div className="lg:w-[30rem] w-full bg-white dark:bg-[#09090B] p-6 flex flex-col gap-6">
        <p className="font-medium text-xl text-gray-800 dark:text-white">
          Create Project
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-500">
          {`Let′s create project to collect chats`}{" "}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup?.object(validationSchema)}
          onSubmit={handleOperation}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className=" grid grid-cols-12 gap-2 md:gap-4 w-full">
              {Schema?.map((inputItem: any) => (
                <Field name={inputItem?.name} key={inputItem?.key}>
                  {(props: FieldProps<string>) => (
                    <div
                      className={`flex flex-col justify-start gap-2 ${inputItem?.className}`}
                    >
                      <div className=" text-gray-900 dark:text-white font-semibold">
                        {inputItem?.label}
                      </div>
                      <CustomInputField
                        key={inputItem?.key}
                        name={inputItem?.name}
                        type={inputItem?.type}
                        value={formik?.values[inputItem?.name]}
                        onChange={(e: any) => {
                          formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        fullWidth
                        formik={formik}
                        error={Boolean(
                          formik?.touched[inputItem?.name] &&
                          formik?.errors[inputItem?.name]
                        )}
                        placeholder="Enter Project Name"
                        helperText={
                          formik?.touched[inputItem?.name] &&
                          (formik?.errors[inputItem?.name] as string)
                        }
                      />
                    </div>
                  )}
                </Field>
              ))}
              <div className="flex w-full items-center col-span-12 justify-center flex-col gap-2 pt-2">
                <Button loading={isLoading} type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default CreateProject;
