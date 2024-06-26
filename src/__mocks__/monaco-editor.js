export const editor = {
    create: jest.fn(() => ({
      // Mocking the returned editor instance methods and properties
      getModel: jest.fn(),
      dispose: jest.fn(),
      // Add more methods as needed
    })),
  };
  