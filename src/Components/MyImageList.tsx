// // MyImageList.tsx
// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
//
// // Define the interface for a single image item
// interface ImageData {
//     id: number;
//     img: any;
//     title: string;
// }
//
// // Define the props interface for the MyImageList component itself
// interface MyImageListProps {
//     itemData: ImageData[];
// }
//
// export default function MyImageList(props: MyImageListProps) {
//     return (
//         <ImageList
//             sx={{
//                 width: '100%',
//                 cols: { xs: 2, sm: 3, md: 4, lg: 5 },
//                 height: 600,
//             }}
//             rowHeight={164}
//         >
//             {/* Use props.itemData to map over the array passed from the parent */}
//             {props.itemData.map((item) => (
//                 <ImageListItem key={item.img}>
//                     <img
//                         src={item.img}
//                         alt={item.title}
//                         loading="lazy"
//                     />
//                 </ImageListItem>
//             ))}
//         </ImageList>
//     );
// }

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


interface ImageData {
    img: any;
}
export default function MyImageList(props: { itemData: ImageData[] }) {
    return (
        <ImageList sx={{ width: '100%' }} variant="woven" cols={3} gap={8}>
            {props.itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={item.img}
                        loading="lazy"
                        alt="sad"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}