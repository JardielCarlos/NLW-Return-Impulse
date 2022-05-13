import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy}
) 

describe('Submit feedback', () => {
  //deve ser capaz de enviar um feedback
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "example comment",
      screenshot: "data:image/png;base64,2159641d6s4fd46s",
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
    // não deve ser capaz de enviar feedback sem type,comment e screenshot
  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "example comment",
      screenshot: "data:image/png;base64,2159641d6s4fd46s",
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64,2159641d6s4fd46s",
    })).rejects.toThrow();
  });
  
  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "Ta tudo bugado",
      screenshot: "test.jpg",
    })).rejects.toThrow();
  });
});