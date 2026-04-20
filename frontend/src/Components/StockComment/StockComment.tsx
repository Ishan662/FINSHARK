import React, { useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import { FaSpinner } from 'react-icons/fa';
import StockCommentList from '../StockCommentList/StockCommentList';

type Props = {
    stockSymbol : string;
}

type CommentFormInputs = {
    title: string;
    content: string;
}
const StockComment = ({stockSymbol} : Props) => {
    const [comments, setComment] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        getComments();
    }, []);
    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
        .then(() => {
            toast.success("Comment created Successfully");
            getComments();
        }).catch((e) => {
            toast.warning(e);
        });

    }

    const getComments = () => {
        setLoading(true);
        commentGetAPI(stockSymbol)
        .then((res) => {
            setLoading(false);
            setComment(res?.data!);
        })
    }
  return (
    <div className='flex flex-col'>
        <StockCommentForm  symbol={stockSymbol} handleComment={handleComment}/>;
    </div>  
  )
}

export default StockComment
