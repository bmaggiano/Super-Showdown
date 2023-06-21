// for a new page, we don't need react router dom
// just create a new folder inside the src/app directory and create a page.tsx inside that folder
// So this page will be available at localhost:3000/test
//app/page.tsx
import { UserButton } from "@clerk/nextjs";

export default function User() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
