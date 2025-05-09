"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
export const signUpSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8).max(50),
})


export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
})