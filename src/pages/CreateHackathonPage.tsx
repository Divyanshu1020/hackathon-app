"use client";
import { TimePicker12Demo } from "@/components/TimePicker/time-picker-demo";
import { cardImage } from "@/components/ui/assets";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addHackathon, editHackathon } from "@/redux/hackathonsSlice";
import { RootState } from "@/redux/store";
import { Hackathon as HackathonType } from "@/types/staticData";
import { add, format, isBefore } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const randomImage = [
  cardImage.one,
  cardImage.two,
  cardImage.three,
  cardImage.four,
  cardImage.five,
  cardImage.six
]
export default function CreateHackathonPage() {
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setstartDate] = useState<Date>();
  const [endDate, setendDate] = useState<Date>();


  const form = useForm<HackathonType>({
    defaultValues: {
      id: Date.now(),
      name: "",
      description: "",
      level: 'Easy',
      status: 'Upcoming',
      image: "",
      startDate: new Date(),
      endDate: add(new Date(), { days: 4 }),
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;



  const onSubmit: SubmitHandler<HackathonType> = (data) => {
    const today = new Date();

    if (data.startDate !== null) {
      if (isBefore(new Date(data.startDate), today)) {
        setError("startDate", {
          type: "manual",
          message: "Start date must be in the future",
        });
        return;
      }
    } else {
      setError("startDate", {
        type: "manual",
        message: "Start date is required",
      });
      return;
    }

    if (data.endDate !== null) {
      if (isBefore(new Date(data.endDate), new Date(data.startDate))) {
        setError("endDate", {
          type: "manual",
          message: "End date cannot be before the start date",
        });
        return;
      }
    } else {
      setError("endDate", {
        type: "manual",
        message: "End date is required",
      });
      return;
    }

    const image = randomImage[Math.floor(Math.random() * 6)];
    const newData = { ...data, image: image };
    dispatch(addHackathon(newData));
    navigate("/");
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      form.setValue("image", file);
    }
  };

  

  const handleStartDateChange= (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!startDate) {
      setstartDate(newDay);
      return;
    }
    const diff = newDay.getTime() - startDate.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(startDate, { days: Math.ceil(diffInDays) });
    setstartDate(newDateFull);
  };

  const handleEndDateChange= (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!endDate) {
      setendDate(newDay);
      return;
    }
    const diff = newDay.getTime() - endDate.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(endDate, { days: Math.ceil(diffInDays) });
    setendDate(newDateFull);
  };

  useEffect(() => {
    if (startDate) {
      form.setValue("startDate", startDate);
    }
  }, [startDate])

  useEffect(() => {
    if (endDate) {
      form.setValue("endDate", endDate);
    }
  }, [endDate])
  

  return (
    <div className="w-full shadow bg-background">
      <h1 className="text-2xl w-full bg-[#F8F9FD] font-extrabold py-10 px-4 pl-12 mb-6">
        Challenge Details
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-3xl px-12 py-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full max-w-lg ">
                <FormLabel>Challenge Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full max-w-lg ">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "do MMM''yy hh:mm a")
                          : "Add start date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-white p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(d) => {
                        handleStartDateChange(d);
                      }}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border">
                      <TimePicker12Demo setDate={setstartDate} date={startDate} />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage>{errors.startDate?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full max-w-lg ">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "do MMM''yy hh:mm a")
                          : "Add end date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(d) => {
                        handleEndDateChange(d);
                      }}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border">
                      <TimePicker12Demo setDate={setendDate} date={endDate} />
                    </div>
                  </PopoverContent>
                </Popover>

                <FormMessage>{errors.endDate?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={10}
                    defaultValue={
                      "Identify the class to which each butterfly belongs to"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="w-full max-w-md ">
                <FormLabel>Image</FormLabel>
                <FormControl>
                <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    {image && <span className="text-sm">{image.name}</span>}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm ">
                <FormLabel>Level Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className=" w-[136px] text-black"
                    >
                      <span className=" capitalize">{field.value}</span>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" bg-background">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className=" p-4 px-10 bg-[#44924C] text-white hover:bg-[#37793e] "
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
