package com.mainproject.backend.domain.board.mapper;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.dto.PageBoardResponseDto;
import com.mainproject.backend.domain.board.dto.BoardWithCommentDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {

    default Board boardPostDtoToBoard(BoardDto.Post postDto){
        Board board = new Board();
        board.setCategory(postDto.getCategory());
        board.setTitle(postDto.getTitle());
        board.setContent(postDto.getContent());


        return board;
    }

    default Board boardPatchDtoToBoard(BoardDto.Patch patchDto) {
        Board board = new Board();
        board.setBoardSeq(patchDto.getBoardSeq());
        board.setCategory(patchDto.getCategory());
        board.setTitle(patchDto.getTitle());
        board.setContent(patchDto.getContent());

        return board;
    }
    default BoardDto.response boardToBoardResponseDto(Board board) {
        BoardDto.response response = new BoardDto.response(board);

        return response;
    }

//    default List<BoardDto.response> boardsToBoardResponsesDto(List<Board> boards) {
//        List<BoardDto.response> responses
//                = boards.stream().map(board -> boardToBoardResponseDto(board)).collect(Collectors.toList());
//        return responses;
//    }
    List<PageBoardResponseDto> boardsToBoardResponsesDto(List<Board> boards);

    default BoardWithCommentDto boardToBoardWithCommentResponseDto(Board board){
       List<Comment> comments = board.getCommentList();
       BoardWithCommentDto boardWithCommentResponseDto = new BoardWithCommentDto();

       boardWithCommentResponseDto.setBoardSeq(board.getBoardSeq());
       boardWithCommentResponseDto.setCategory(board.getCategory().getValue());
       boardWithCommentResponseDto.setTitle(board.getTitle());
       boardWithCommentResponseDto.setUserId(board.getUser().getUserId());
       boardWithCommentResponseDto.setProfileImageUrl(board.getUser().getProfileImageUrl());
       boardWithCommentResponseDto.setBookmarkStatus(board.isBookmarkStatus());
       boardWithCommentResponseDto.setContent(board.getContent());
       boardWithCommentResponseDto.setBookmarkCount(board.getBookmarked());
       boardWithCommentResponseDto.setLikeCount(board.getLiked());
       boardWithCommentResponseDto.setDislikeCount(board.getDisliked());
       boardWithCommentResponseDto.setViewCount(board.getViewCount());
       boardWithCommentResponseDto.setCreatedAt(board.getCreatedAt());
       boardWithCommentResponseDto.setModifiedAt(board.getModifiedAt());

       //커맨트
        boardWithCommentResponseDto.setComments(commentToBoardWithCommentResponseDtos(comments));

        return boardWithCommentResponseDto;
    }

    //comment 리스트화
    default List<CommentResponseDto> commentToBoardWithCommentResponseDtos(List<Comment> comments){
        return comments
                .stream()
                .map(comment -> CommentResponseDto
                        .builder()
                        .commentSeq(comment.getCommentSeq())
                        .userSeq(comment.getUser().getUserSeq())
                        .boardSeq(comment.getBoard().getBoardSeq())
                        .username(comment.getUser().getUsername())
                        .liked(comment.getLiked())
                        .disliked(comment.getDisliked())
                        .userId(comment.getUser().getUserId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
