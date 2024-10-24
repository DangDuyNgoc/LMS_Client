import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'

export default function VerifyAccountScreen() {
    const [code, setCode] = useState(new Array(4).fill(''));

    const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

    const handleInput = (text:any, index:any) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if(code &&  index < 3) {
            inputs.current[index + 1].current.focus();
        }

        if(text === "" && index > 0) {
            inputs.current[index -1].current.focus();
        }
    }
  return (
    <View>
      <Text>VerifyAccountScreen</Text>
    </View>
  )
}