import LoginForm from "@/components/auth/LoginForm"
import ClientOnly from "@/utils/ClientOnly"

export default function page() {
    return(
        <ClientOnly>
            <div>
                <LoginForm></LoginForm>
            </div>
        </ClientOnly>
    )
}