import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { axioserror, createNewUser, GenerateNotes, GenerateStudyTypeContent, GetStudyMaterialInjest, helloWorld } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    createNewUser,
    GenerateNotes,
    GenerateStudyTypeContent,
    
  ],
});
