import bcrypt from 'bcrypt';

export const encrypt = async (password, saltTimes) => {
  const hash = await bcrypt.hash(password, saltTimes);
  return hash; 
};

export const validate = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};