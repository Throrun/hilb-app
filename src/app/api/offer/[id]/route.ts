import { offer } from "@/lib/db_collections";
import { ObjectId } from "mongodb";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const offerPromise = await params;
    const offerId = new ObjectId(offerPromise.id);
    try{
    const dbResponse = await offer.deleteOne({_id: offerId});
    if (!dbResponse.acknowledged) {
        throw new Error("Deletion failed");
    }
    if (dbResponse.deletedCount=0){
        return new Response ("fail", {status:404})
    }
    return new Response("success", { status: 200 });
    } catch {
        return new Response("fail", {status:500})
    }
}
