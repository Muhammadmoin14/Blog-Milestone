'use client'

import React from 'react'
import {z} from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//? ui import 
// import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
//? Client Import
// import { client } from '@/sanity/lib/client';

const blogSchema = z.object({
    title: z.string().min(5, "Title must be at least 3 characters"),
    description: z.string().min(30, "Content must be at least 30 characters").max(300, "Content must be at most 300 character"),
    author: z.string().min(3, "Author must be at least 3 characters"),
    image: z.any().optional(), // Handle file uploads separately
  });


    // type blogSchematype = {
    //     title: string
    //     description: string
    //     author: string
    //     image: string
    // }

const ProductForm = () => {

    const form = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            image: "",
            
        },
    })
    


return (
    <div>
    <Form {...form}>

    <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
            <Input placeholder="shadcn" {...field} />
            </FormControl>

            <FormMessage />
        </FormItem>
        )}
        />
    </Form>
    </div>
  );
}

export default ProductForm