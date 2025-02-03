import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

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
        receivedAt: z.string().transform((date) => new Date(date)), // Convertir a Date
        deliveredAt: z
          .string()
          .optional()
          .transform((date) => (date ? new Date(date) : undefined)), // Convertir a Date
        documentType: z.enum(["DICTAMEN", "INFORME"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
        },
      });
    }),
});
