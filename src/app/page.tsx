import Image from "next/image";
import ProfileForm  from "../components/custom/profileForm";
require('dotenv').config({ path: '@/.env.local' });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-lg lg:flex">
        <h1 className="">2024 Venture Miami Hiring Fair</h1>
      </div>
      <ProfileForm />
    </main>
  );
}
