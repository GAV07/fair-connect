import Image from "next/image";
import ProfileForm  from "../components/custom/profileForm";
require('dotenv').config({ path: '@/.env.local' });
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card" 
import background from "@/images/background.svg"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="absolute z-0 w-[100vw] h-[100vh] ">
          <Image className="object-cover w-full h-full" src={background} alt="background" />
        </div>
        <div className="relative z-10">
          <Card className="w-[80vw] md:w-[30vw]">
            <CardHeader>
              <CardTitle className="text-[#3F47FD]">2024 Venture Miami Hiring Fair</CardTitle>
              <CardDescription>Use this form to connect with each company you have connected with during the fair. If you are in our Talent Database they will see your profile and resume once submitted.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm /> 
            </CardContent>
          </Card>
        </div>
    </main>
  );
}
