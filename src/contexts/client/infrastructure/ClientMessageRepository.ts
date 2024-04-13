export const ClientMessageRepository = () => {
  let message = "";

  return {
    getMessage: () => message,
    setMessage: (content: string) => {
      message = content;
    },
    clear: () => {
      message = "";
    },
  };
};

export type ClientMessageRepository = ReturnType<
  typeof ClientMessageRepository
>;
