import RegisterForm from "@/components/auth/RegisterForm"
import ClientOnly from "@/utils/ClientOnly"

export default function page() {
    return(
        <ClientOnly>
            <div>
                <RegisterForm></RegisterForm>
            </div>
        </ClientOnly>
    )
}