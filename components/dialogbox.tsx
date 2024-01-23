import Taskform from "@/components/taskform";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Dialogbox = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"}>Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <Taskform adding={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dialogbox