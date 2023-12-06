"use client"

import { Auth } from "../../components/Auth/Auth"
import { ThreadDetail } from "../../components/ThreadDetail/ThreadDetail"

export default function ThreadPage({params}) {

  return (
    <>
      <Auth/>
      <ThreadDetail id={params.slug}/>
    </>
  )
}
