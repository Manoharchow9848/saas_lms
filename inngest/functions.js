import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, generateStudyTypeContentAiModel } from "@/configs/AiModel";
import axios from "axios";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello  ${event.data.email}!` };
  }
);

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    const result = await step.run(
      "check user and create new User if not in DB",
      async () => {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
        
        if (result?.length == 0) {
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });
             return userResp;
        }
     return result;
       
      }
    );
    return 'Success'
  }
  //STEP TO SEND WELCOME EMAIL NOTIFICATION
  //SEP TO SEND EMAIL NOTIFICATION AFTER USER JOIN IT
);

export const GenerateNotes=inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data; //All record info

    //generate notes for each chapter
    const notesResult = await step.run(
      "generate notes for each chapter",
      async () => {
        const Chapters = course?.courseLayout.courseList;
        let index=0;
        Chapters.forEach(async (chapter) => {
          const prompt = `Generate exam material detail content for each chapter. 
          Make sure to include all topic point in the content,make sure to dive content
           in html format(Do not Add HTML,HEAD,BODY,TITLE tag) use tailwind css to decorate and
           use className(don't use class use className) for decorating and heading with big letters and content in border of light-gray and gap between content, The chapters: ${JSON.stringify(
            chapter)}`;

          const result = await generateNotesAiModel.sendMessage(prompt);
           const aiResp = result.response.text();

           await db.insert(CHAPTER_NOTES_TABLE).values({
             chapterId:index,
             courseId: course?.courseId,
             notes:aiResp
           })
           index=index+1;
          
        })
        return 'Completed'
      })
      //update status 

      const updateCourseStatusResult = await step.run(
        "update course status",
        async () => {
          const result = await db
            .update(STUDY_MATERIAL_TABLE)
            .set({ status: "Generated" })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
         return 'Success'; 
        }
      );
      
  }
)
// used to generate flashcard,quiz,qa
export const GenerateStudyTypeContent = inngest.createFunction(
         {id:'Generate Study Type Content'},
         {event:'studyType.content'},

         async({event,step})=>{
           const {studyType,prompt,courseId,recordId} = event.data;

              const FlashcardAiResult = await step.run('Generating FlashCard Using AI',async()=>{
                  const result = await generateStudyTypeContentAiModel.sendMessage(prompt);
                  const Airesult =  JSON.parse(result.response.text());
                  return Airesult;

              })

              //save the rsult in db

              const DbResult = await step.run('save result to db',async()=>{
                const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
                .set({
                  content:FlashcardAiResult,
                  status:'Ready',
                }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
              
                return 'Data inserted Successfully '
              })
         }
)


