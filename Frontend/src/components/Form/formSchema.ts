import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Forneça um e-mail válido." }).min(1, { message: "O e-mail é obrigatório." }),
  phone: z.string().min(1, { message: "O telefone é obrigatório." }),
  coordinate_x: z.string()
    .regex(/^[0-9]+(?:\.[0-9]+)?$/, { message: "Informe um número válido. Aceitamos apenas números inteiros ou decimais." })
    .min(1, { message: "A coordenada X é obrigatória." }),
  coordinate_y: z.string()
    .regex(/^[0-9]+(?:\.[0-9]+)?$/, { message: "Informe um número válido. Aceitamos apenas números inteiros ou decimais." })
    .min(1, { message: "A coordenada Y é obrigatória." }),
});
