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
import Confetti from "@/components/custom/confetti"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="absolute z-0 w-[100vw] h-[100vh]">
          <Image className="object-cover w-full h-full" src={background} alt="background" />
        </div>
        <div className="absolute z-1 w-[100%] h-[100%]">
          <Confetti />
        </div>
        <div className="relative z-10">
          <Card className="w-[80vw] md:w-[30vw]">
            <CardHeader>
              <CardTitle className="text-[#3F47FD]">2024 Venture Miami Hiring Fair</CardTitle>
              <CardDescription>Connect with companies you meet. If you are in our Talent Database they will see your profile!</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm /> 
            </CardContent>
          </Card>
        </div>
    </main>
  );
}
