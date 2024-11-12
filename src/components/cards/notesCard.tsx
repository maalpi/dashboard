import * as React from "react"
 
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
 
export function Nota({ title, content, id }) {
  return (
    <Card className="w-[240px] mt-5 shadow-md float-left">
      <CardContent className="m-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mt-2 text-wrap md:text-balance">{content}</CardDescription>
      </CardContent>
    </Card>
  )
}