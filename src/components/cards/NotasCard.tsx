import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

 
export function CardNotas() {
  return (
    <Card className="w-[600px] shadow-md">
      <CardContent className="m-4">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="name" placeholder="Titulo" className="outline-none shadow-none border-none resize-none text-xl placeholder:italic"/>
              <p>
                <Textarea name='content' id='content' placeholder="escreva a nota..." className="outline-none resize-none shadow-none border-none placeholder:italic"></Textarea>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}