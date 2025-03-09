import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

const DatePicker = (props) => {
  const formatDate = (date) => {
    const localDate = new Date(date);
    return localDate.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div className="my-3 sm:my-5">
      <FormField
        control={props.form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className="block w-full text-start"
                      variant={"outline"}>
                      {formatDate(field.value ?? new Date())}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? new Date()}
                    onSelect={field.onChange}
                    disabled={(date) => date < (props.min ?? new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DatePicker;
