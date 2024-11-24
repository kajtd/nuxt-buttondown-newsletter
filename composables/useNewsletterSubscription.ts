const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export function useNewsletterSubscription() {
    const email = ref("");
    const loading = ref(false);
    const alert = ref<"success" | "error" | "">("");
    const alertTitle = ref("");
    const alertDescription = ref("");
  
    const subscribeToNewsletter = async () => {
      try {
        if (!isValidEmail(email.value)) {
          alert.value = "error";
          alertTitle.value = "Invalid Email";
          alertDescription.value =
            "Please enter a valid email address.";
          return;
        }
  
        loading.value = true;
        await $fetch("/api/subscribe", {
          method: "POST",
          body: { email: email.value }
        });
  
        alert.value = "success";
        alertTitle.value = "Welcome aboard! 🎉";
        alertDescription.value =
          "Please check your inbox to confirm your subscription.";
        email.value = "";
  
      } catch (error) {
        console.error("Subscription failed:", error);
        alert.value = "error";
        alertTitle.value = "Something went wrong";
        alertDescription.value =
          "Unable to subscribe. Please try again later.";
      } finally {
        loading.value = false;
        // Clear alert after 5 seconds
        setTimeout(() => {
          alert.value = "";
        }, 5000);
      }
    };
  
    return {
      email,
      loading,
      alert,
      alertTitle,
      alertDescription,
      subscribeToNewsletter,
    };
  }
  