import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const invesmentDocumentRouter = createTRPCRouter({
  getDocuments: protectedProcedure
    .input(
      z.object({
        folio: z.string().optional(),
        victimName: z.string().optional(),
        requestingMP: z.string().optional(),
        psychologistId: z.number().optional(),
      }),
    )
    .query(({ input, ctx }) => {
      const documents = ctx.db.investigationFolder.findMany({
        relationLoadStrategy: "join", // or 'query'
        include: {
          psychologist: true,
        },
        where: {
          AND: [
            input.folio ? { id: parseInt(input.folio) } : {},
            input.victimName
              ? {
                  victimName: {
                    contains: input.victimName,
                    mode: "insensitive",
                  },
                }
              : {},
            input.requestingMP
              ? {
                  requestingMP: {
                    contains: input.requestingMP,
                    mode: "insensitive",
                  },
                }
              : {},
            input.psychologistId
              ? { psychologistId: input.psychologistId }
              : {},
          ],
        },
      });
      return documents;
    }),

  create: protectedProcedure
    .input(
      z.object({
        victimName: z.string().min(1),
        folio: z.string().min(1),
        requestingMP: z.string().min(1),
        crime: z.string().min(1),
        unit: z.string().min(1),
        psychologistId: z.number().int(),
        receivedAt: z.coerce.date(), // Convertir a Date
        deliveredAt: z.coerce.date().optional(), // Convertir a Date
        documentType: z.enum(["DICTAMEN", "INFORME"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingFolio = await ctx.db.investigationFolder.findUnique({
        where: { folio: input.folio },
      });

      if (existingFolio) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "El folio ya está en uso.",
        });
      }
      return ctx.db.investigationFolder.create({
        data: {
          victimName: input.victimName,
          folio: input.folio,
          requestingMP: input.requestingMP,
          crime: input.crime,
          unit: input.unit,
          psychologist: { connect: { id: input.psychologistId } },
          receivedAt: input.receivedAt,
          deliveredAt: input.deliveredAt,
          document: input.documentType,
          updatedAt: new Date(),
          createdByUser: { connect: { email: ctx.session.user.email ?? "" } },
          lastUpdateByUser: {
            connect: { email: ctx.session.user.email ?? "" },
          },
        },
      });
    }),
});
