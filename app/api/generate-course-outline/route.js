import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {

    const {courseId,topic,courseType,difficultyLevel,createdBy} = await req.json();

    //generate course layout using ai
   const Prompt=`Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of courseList of Chapters along with summary for each chapter, Topic list in each chapter, All result in json format`
    const aiResp = await courseOutlineAIModel.sendMessage(Prompt);
    const aiResult = JSON.parse(aiResp.response.text());

    //save the result along with user input
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        topic:topic,
        difficultyLevel:difficultyLevel,
        courseLayout:aiResult,
        createdBy:createdBy
    }).returning({resp:STUDY_MATERIAL_TABLE})

     // Trigger the Inngest function to generate chapter notes

     const result = await inngest.send({
        name: "notes.generate",
        data: {
          course: dbResult[0].resp,
        },
      });
    console.log(result);
    
    return NextResponse.json({result:dbResult[0]});

}