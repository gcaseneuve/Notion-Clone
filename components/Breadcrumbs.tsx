"user client";
import { usePathname } from 'next/navigation'
import React, { Fragment } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
import { Slash } from "lucide-react"





function Breadcrumbs() {

    const pathName = usePathname();

    const segment = pathName.split('/');
    console.log(segment);

  return (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>




            {segment.map((seg, index) => {
                if(!seg) return null;
                const href = `/${segment.slice(0, index + 1).join("/")}`;
                const isLast = index === segment.length - 1;

                return (
                    <Fragment key = {seg}>  
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage>{segment}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={href}>{seg}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </Fragment>
                );
            })}



            
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs