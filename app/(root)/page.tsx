import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import Image from "next/image";


import React from 'react'

const Home = () => {
  return (
    <>
      <Button>Click Me</Button>
      <p className="mx-4 my-4 w-xl rounded-md border border-amber-300 border-2 px-4 py-4 text-center text-amber-400">ABC</p>

      <BookOverview />

      <BookList />
    </>
  )
}

export default Home;