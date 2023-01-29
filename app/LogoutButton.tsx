"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
	return (
		<div
			onClick={() => { signOut({ callbackUrl: `${process.env.VERCEL_URL || 'http://localhost:3000'}/auth/signin` }) }}
			className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
		>
			Sign Out
		</div>
	)
}

export default LogoutButton;