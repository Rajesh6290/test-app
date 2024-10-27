"use client"
import { useMyContext } from '@/app/context/MyContext'
import useSwr from '@/hooks/useSwr'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from '../core/Button'
import { useMutation } from '@/hooks'
import { BsReverseLayoutSidebarReverse } from 'react-icons/bs'
import { TbSlash } from 'react-icons/tb'
import { LuTable } from 'react-icons/lu'
import { FaArrowRight } from 'react-icons/fa6'

const WorkFlows = () => {
    const { sliderOpen, setSliderOpen, fullWidth, setFullWidth } = useMyContext()
    const params = useParams()
    const { data, isValidating } = useSwr(`workflow/workflow/${params?.id}`)
    const [tab, setTab] = useState<string>("Run")
    const { isLoading, mutation } = useMutation()

    const initialValues = data?.tasks?.reduce((accumulator: any, currentValue: any) => {
        accumulator[currentValue?.name] = currentValue.initialValue || '';
        return accumulator;
    }, {});

    const validationSchema = Yup.object(
        data?.tasks?.reduce((accumulator: any, currentValue: any) => {
            accumulator[currentValue?.name] = Yup.string().required(`${currentValue?.name} is required`);
            return accumulator;
        }, {})
    );

    const handleOperation = async (values: any) => {
        const formDataArray = Object.keys(values).map((key) => ({
            [key]: values[key],
        }));
        console.log('Submitted Data:', formDataArray);
    };

    return (
        <div className="size-full overflow-y-auto flex flex-col gap-5 relative">
            <div className="flex w-full relative items-center lg:gap-3 gap-2 border-b border-[#ebe8e8] dark:border-[#272727] py-2 px-6">
                <BsReverseLayoutSidebarReverse
                    onClick={() => setSliderOpen(true)}
                    className="text-2xl mr-2 cursor-pointer lg:hidden block text-gray-500 dark:text-gray-400"
                />
                {
                    fullWidth &&
                    <BsReverseLayoutSidebarReverse
                        onClick={() => setFullWidth(false)}
                        className="text-2xl cursor-pointer text-gray-500 dark:text-gray-400"
                    />
                }
                <h1 className=" lg:text-xl font-medium">Workflow</h1>
                <TbSlash className="text-2xl  -rotate-12  text-gray-500 dark:text-gray-400" />
                <h1 className="font-medium lg:text-base text-xs ">{data?.workflowName}</h1>
                <div className=' absolute left-0 top-0 size-full hidden lg:flex items-end justify-center'>
                    <div className='flex items-center gap-5'>
                        {
                            ["Build", "Run", "Table"]?.map((item, index) => (
                                <p key={index} onClick={() => setTab(item)} className={`relative inline-flex pb-2  items-center whitespace-nowrap  cursor-pointer px-2 align-baseline text-sm font-medium ${item === tab && `border-[#693EE0] border-b-2 `}`}>

                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='w-full flex border-b border-[#ebe8e8] dark:border-[#272727] lg:hidden items-start justify-center'>
                <div className='flex items-center gap-5'>
                    {
                        ["Build", "Run", "Table"]?.map((item, index) => (
                            <p key={index} onClick={() => setTab(item)} className={`relative inline-flex pb-2  items-center whitespace-nowrap  cursor-pointer px-2 align-baseline text-sm font-medium ${item === tab && `border-[#693EE0] border-b-2 `}`}>

                                {item}
                            </p>
                        ))
                    }
                </div>
            </div>
            <div className="size-full flex items-start justify-center">
                <div className="lg:w-[80%] w-full lg:px-0 px-3 flex flex-col gap-3 items-start pb-5">
                    <p className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Run workflow.</p>
                    <p className='text-sm text-gray-800 dark:text-gray-100'>Fill in the input to kick off your workflow.</p>
                    <div className='w-full h-fit p-6 rounded-[15px] border border-[#D7D7D7] dark:border-[#272727] shadow-lg'>
                        <span className='flex items-center gap-2'>
                            <span className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400/30 text-yellow-600'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.99999 7.56165V6.0001L7.99999 2.27018L2.30611 7.01508L6.48506 8.05981L7.99999 8.43855V10.0001L7.99998 13.73L13.6939 8.98512L9.51491 7.94038L7.99999 7.56165ZM9.99999 6.0001V2.27018C9.99999 0.574506 8.02227 -0.351808 6.71962 0.733737L1.02574 5.47863C-0.231581 6.5264 0.233236 8.55841 1.82104 8.95536L5.99999 10.0001V13.73C5.99999 15.4257 7.9777 16.352 9.28035 15.2665L14.9742 10.5216C16.2316 9.47379 15.7667 7.44179 14.1789 7.04484L9.99999 6.0001Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <p className='font-semibold text-gray-900 dark:text-gray-200'>Input</p>
                        </span>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleOperation}
                            enableReinitialize={true}
                        >
                            {({ errors, touched }) => (
                                <Form className="grid grid-cols-12 gap-2 md:gap-4 w-full pt-3">
                                    {data?.tasks?.map((inputItem: any, index: number) => (
                                        <div key={index} className="flex flex-col justify-start gap-2 col-span-12">
                                            <label
                                                className="capitalize font-medium text-gray-900 dark:text-white "
                                            >
                                                {inputItem?.name}
                                            </label>
                                            <p className='font-medium text-xs text-gray-700 dark:text-gray-300'>{inputItem?.description}</p>
                                            <Field
                                                name={inputItem?.name}
                                                type={inputItem?.type}
                                                className={`outline-none border py-2 px-4 rounded-[8px] bg-transparent text-gray-700 dark:text-gray-200 ${errors[inputItem?.name] && touched[inputItem?.name]
                                                    ? 'border-red-500'
                                                    : 'border-[#ebe8e8] dark:border-[#414040]'
                                                    }`}
                                            />
                                            {errors[inputItem?.name] && touched[inputItem?.name] && (
                                                <p className="text-red-500 text-xs">{String(errors[inputItem?.name])}</p>
                                            )}

                                        </div>
                                    ))}
                                    <div className="flex w-full items-center col-span-12 justify-center flex-col gap-2 pt-2">
                                        <Button loading={isLoading} type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className='w-full flex items-center justify-center pt-5'>
                            <span className='flex cursor-pointer items-center gap-2'>
                                <LuTable className='text-lg text-gray-700 dark:text-gray-300' />
                                <p className=' font-medium  text-gray-700  dark:text-gray-300' >Go to the table to view all workflows runs</p>
                                <FaArrowRight className='text-lg text-gray-700 dark:text-gray-300' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkFlows;
