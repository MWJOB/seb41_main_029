package com.mainproject.backend.domain.board.mapper;

import com.mainproject.backend.domain.board.dto.BoardDto;
import com.mainproject.backend.domain.board.dto.BoardWithCommentDto;
import com.mainproject.backend.domain.board.entity.Board;
import com.mainproject.backend.domain.comment.dto.CommentResponseDto;
import com.mainproject.backend.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


<<<<<<< HEAD

import java.time.LocalDateTime;
import java.util.ArrayList;
=======
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
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

    default List<BoardDto.PageBoardResponse> boardsToBoardResponsesDto(List<Board> boards){
        return boards.stream()
                .map(board -> BoardDto.PageBoardResponse
                        .builder()
                        .boardSeq(board.getBoardSeq())
                        .userSeq(board.getUser().getUserSeq())
                                .username(board.getUser().getUsername())
                                .category(board.getCategory().category)
                                .title(board.getTitle())
                                .bookmarkCount(board.getBookmarked())
                                .BookmarkStatus(board.isBookmarkStatus())
                                .viewCount(board.getViewCount())
                                .likeCount(board.getLiked())
                                .createdAt(board.getCreatedAt())
                                .build())
                .collect(Collectors.toList());
    }

    default BoardWithCommentDto boardToBoardWithCommentResponseDto(Board board){
<<<<<<< HEAD
        List<Comment> comments = board.getCommentList();
        BoardWithCommentDto boardWithCommentResponseDto = new BoardWithCommentDto();

        boardWithCommentResponseDto.setBoardSeq(board.getBoardSeq());
        boardWithCommentResponseDto.setCategory(board.getCategory().category);
        boardWithCommentResponseDto.setTitle(board.getTitle());
        boardWithCommentResponseDto.setContent(board.getContent());
        boardWithCommentResponseDto.setViewCount(board.getViewCount());
        boardWithCommentResponseDto.setCreatedAt(board.getCreatedAt());
        boardWithCommentResponseDto.setModifiedAt(board.getModifiedAt());

        //답변
=======
       List<Comment> comments = board.getCommentList();
       BoardWithCommentDto boardWithCommentResponseDto = new BoardWithCommentDto();

       boardWithCommentResponseDto.setBoardSeq(board.getBoardSeq());
       boardWithCommentResponseDto.setCategory(board.getCategory().getValue());
       boardWithCommentResponseDto.setTitle(board.getTitle());
       boardWithCommentResponseDto.setContent(board.getContent());
       boardWithCommentResponseDto.setViewCount(board.getViewCount());
       boardWithCommentResponseDto.setCreatedAt(board.getCreatedAt());
       boardWithCommentResponseDto.setModifiedAt(board.getModifiedAt());

       //커맨트
>>>>>>> ca5cb470cdd5998dc71bccbb5d7c597ce7b3b1f4
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
                        .userId(comment.getUser().getUserId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
