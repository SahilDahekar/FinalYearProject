import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Form } from "../ui/form";


function StudioModal() {
  return (
    <Dialog defaultOpen>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
                Please specify the stream details
            </DialogDescription>
            <div>
              
            </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default StudioModal;