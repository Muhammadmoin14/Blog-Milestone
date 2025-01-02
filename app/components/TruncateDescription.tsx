import React from 'react'



type TruncateDescriptionProps = {
    description : string,
    wordLimit: number,

}

const TruncateDescription: React.FC<TruncateDescriptionProps> = ({description , wordLimit}) => {

    const truncateText = (text: string, limit: number) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        else
        return text ;
    }

    return <p className='font-normal font-Raleway text-base text-secondarygray break-words'>{truncateText(description, wordLimit)}</p>
}


export default TruncateDescription