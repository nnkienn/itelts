import RegisterForm from "@/components/auth/RegisterForm";
import ClientOnly from "@/components/ClientOnly";

export default function page() {
  return (
    <ClientOnly>
      <div className="flex items-center justify-center min-h-screen">
        <RegisterForm />  
      </div>
    </ClientOnly>

  );
}