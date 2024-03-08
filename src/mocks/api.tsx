import { useEffect, useState } from 'react';
import { RegisterInput } from '../pages/sign_up';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

export interface dataType extends RegisterInput {
  memberResultData?: {};
  users?: [
    { phone: string; userId: string; email: string; role: string; username: string; birth: Date; password: string },
  ];
}

export function useApi() {
  const [data, setData] = useState<dataType>();

  useEffect(() => {
    const getTest = () => {
      axios
        .get('http://localhost:3000/data')
        .then((res) => {
          const { data } = res;
          setData(data);
        })
        .catch((error) => console.log(error));
    };
    getTest();
  }, []);

  return { data };
}

export function usePostApi() {
  const { toast } = useToast();

  const postData = async (formData: dataType) => {
    try {
      const response = await axios.post('http://localhost:3000/data', formData);
      const data = response.data;
      console.log(data);
      toast({
        title: '회원가입 성공!',
        description: 'success',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: '오류 발생',
        description: '회원가입 중 오류가 발생했습니다.',
      });
    }
  };

  return { postData };
}
