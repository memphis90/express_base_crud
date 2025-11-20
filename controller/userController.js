import User from '../model/userModel.js';

export const create = async (req, res) => {
  try {
  
    const userData = new User(req.body);
    const {email} = userData;


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }   

    const savedUser = await userData.save();
    return res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};


export const fetch = async (req, res) => {
  try {
    
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
      res.status(200).json(users);


  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
    }
   } 


export const update = async (req, res) => {
  try {
  
    const id = req.params.id;

    const userExists = await User.findOne({ _id:id });

    if (!userExists) {
      return res.status(404).json({ error: 'User with this email not exists' });
    }   

    const UpdatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(201).json(UpdatedUser);

  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
  };

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id; 
    const userExists = await User.findOne({ _id:id });

    if (!userExists) {
      return res.status(404).json({ error: 'User with this email not exists' });
    } 

    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }     
};