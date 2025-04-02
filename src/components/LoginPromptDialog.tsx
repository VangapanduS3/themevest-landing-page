
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogIn, UserPlus } from "lucide-react";

interface LoginPromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptDialog = ({ isOpen, onClose }: LoginPromptDialogProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  const handleSignup = () => {
    navigate("/signup");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login Required</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in to make an investment. Please log in to your
            account or create a new one to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleLogin}
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Log in
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={handleSignup}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Sign up
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginPromptDialog;
