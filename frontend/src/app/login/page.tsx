import ClientOnly from "@/components/ClientOnly";
import LoginForm from "@/components/auth/LoginFrom";

export default function page() {
  return (
    <ClientOnly>
      <div className="flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </ClientOnly>

  );
}